---
sidebar_position: 0
---

# Google Cloud Platform

## Set environment variables

```sh
export ORG_ID=<Your GCP ORG ID>
export PROJECT_ID=<Your GCP Project ID>
export REGION=<Your Region that you are deploying your website>
export PROJECT_NAME_SLUG=<Your Project Name (ex: bildap-co)>

export CICD_SA=${PROJECT_NAME_SLUG}-cicd-sa
export CICD_SA_PRINCIPAL=${CICD_SA}@${PROJECT_ID}.iam.gserviceaccount.com
export POSTGRRE_INSTANCE_NAME=${PROJECT_NAME_SLUG}-postgres-instance
export POSTGRES_DB_PASSWORD=<Your Postgres Database Password>
```

## Authenticate

To manage a conda environment with Python 3.10, you can use the following shell commands:

- Create a new conda environment:

  ```sh
  conda create --name ${PROJECT_NAME_SLUG} python=3.10
  ```

- Activate the conda environment:

  ```sh
  conda activate ${PROJECT_NAME_SLUG}
  ```

- Deactivate the conda environment:

  ```sh
  conda deactivate
  ```

- Delete the conda environment:

  ```sh
  conda env remove --name ${PROJECT_NAME_SLUG}
  ```

To install the gcloud CLI, follow the instructions in the official [Google Cloud CLI documentation](https://cloud.google.com/sdk/docs/install).

```sh
gcloud init
gcloud auth login
gcloud auth application-default login

gcloud config set project $PROJECT_ID
```

## Enable Google API

```sh
APIS=(
  "orgpolicy.googleapis.com"
  "iamcredentials.googleapis.com"
  "iam.googleapis.com"
  "run.googleapis.com"
  "cloudresourcemanager.googleapis.com"
  "artifactregistry.googleapis.com"
  "sqladmin.googleapis.com"
  "compute.googleapis.com"
  "storage.googleapis.com"
  "secretmanager.googleapis.com"
  "calendar-json.googleapis.com"
)

for API in "${APIS[@]}"
do
  echo "Enabling $API"
  gcloud services enable "$API" --project="$PROJECT_ID"
done
```

## Create Service Account

```
gcloud iam service-accounts create ${CICD_SA} \
  --project="$PROJECT_ID" \
  --description="Service Account for deployment via GitHub Actions" \
  --display-name="Github Action CI/CD Service Account"
```

#### To Create Key for your Service account:

```sh
# To create a key
gcloud iam service-accounts keys create ${CICD_SA}.json \
    --iam-account=${CICD_SA_PRINCIPAL}

# Move the key in a proper place for reusability
mv ${CICD_SA}.json ~/.config/gcloud/

# To Use that service account key as your application credential
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/gcloud/${CICD_SA}.json"
```

#### Assign Roles to the service account:

```sh
ROLES=(
  "roles/cloudbuild.builds.builder"
  "roles/logging.logWriter"
  "roles/iam.roleAdmin"
  "roles/iam.serviceAccountAdmin"
  "roles/iam.serviceAccountUser"
  "roles/iam.serviceAccountTokenCreator"
  "roles/resourcemanager.projectIamAdmin"
  "roles/run.admin"
  "roles/run.invoker"
  "roles/run.serviceAgent"
  "roles/storage.admin"
  "roles/cloudscheduler.admin"
  "roles/artifactregistry.reader"
  "roles/storage.objectViewer"
  "roles/cloudsql.client"
  "roles/secretmanager.secretAccessor"
)
for ROLE in "${ROLES[@]}"
do
  echo "Binding $ROLE"
  gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
    --member="serviceAccount:${CICD_SA_PRINCIPAL}" \
    --role="$ROLE"
done
```

#### If your Org has restriction on creation of keys for service account:

1.  List organization constraints

    ```sh
    gcloud resource-manager org-policies list \
        --organization=${ORG_ID}
    ```

2.  Remove constraint at project level (This may take a while to take effect)

    ```sh
    gcloud resource-manager org-policies disable-enforce \
        constraints/iam.disableServiceAccountKeyCreation \
        --project=${PROJECT_ID}
    ```

3.  Create service account key (after constraint is removed)

    ```sh
    # To create a key
    gcloud iam service-accounts keys create ${CICD_SA}.json \
        --iam-account=${CICD_SA_PRINCIPAL}

    # Move the key in a proper place for reusability
    mv ${CICD_SA}.json ~/.config/gcloud/

    # To Use that service account key as your application credential
    export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/gcloud/${CICD_SA}.json"
    ```

4.  Optional: Re-enable constraint

    ```sh
    gcloud resource-manager org-policies enable-enforce \
        constraints/iam.disableServiceAccountKeyCreation \
        --project=${PROJECT_ID}
    ```

## Create GCS (Google Cloud Storage) Bucket

You can use this storage bucket to host the uploaded files in your container. If you use a docker container alone, any uploaded file will be removed after deployment of a fresh container.

```sh
gcloud storage buckets create gs://${PROJECT_NAME_SLUG}-${PROJECT_ID}-public-uploads --location ${REGION}
```

## Create Postgres Database

#### To Create a new instance Postgres 14 on Google Cloud SQL

```sh
gcloud sql instances create ${POSTGRRE_INSTANCE_NAME} \
    --database-version=POSTGRES_14 \
    --tier=db-f1-micro \ # Use the tier that fits your need
    --region=${REGION} \
    --storage-size=10GB \ # Use the storage size that fits your need
    --storage-type=HDD # Use the storage type that fits your need
```

#### To create a new Database in the created instance:

```sh
gcloud sql databases create ${PROJECT_NAME_SLUG} --instance=${POSTGRRE_INSTANCE_NAME}
```

#### To create a new User for the created Database:

```sh
gcloud sql users create ${PROJECT_NAME_SLUG} \
  --instance=${POSTGRRE_INSTANCE_NAME} \
  --password=${POSTGRES_DB_PASSWORD}
```

#### This Concludes the essential operational components that you need to deploy your website:

Once you are done with this setup, you need to update the `DATABASE_URL`in `.env`file to the following:

> Considering the following values for your database:
>
> - GCP Project id: `bildap-co`
> - Postgres Region: `us-west1`
> - Postgres Instance name: `bildap-postgres-instance`
> - Database Name: `bildap-dbname`
> - Database Port: `5432`
> - Database Schema Name: `production`
> - Database Credential Username: `bildap-user`
> - Database Credential Password: `bildap-password`

```
DATABASE_URL=postgresql://bildap-user:bildap-password@localhost:5432/bildap?schema=bildap-dbname&host=/cloudsql/bildap-co:us-west1:bildap-postgres-instance
```

## CI/CD _(automation)_

You can place the following yaml code in `.github/workflows/github-action.yml` :

```sh
name: Deployment
on:
  push:
    branches:
      # Place the name of the branch you are aiming to trigger this pipeline when you push commits
      - main

jobs:
  Deployment:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    env:
      CICD_SA_PRINCIPAL: ${{ secrets.CICD_SA_PRINCIPAL }}
      CICD_SA_JSON_FILE: ${{ secrets.CICD_SA_JSON_FILE }}
      PROJECT_ID: ${{ secrets.PROJECT_ID }}
      PROJECT_NUMBER: ${{ secrets.PROJECT_NUMBER }}
      PROJECT_NAME_SLUG: <Your Project Name (ex: bildap-co)>
      REGION: ${{ secrets.REGION }}
      ENV_CONFIG: ${{ secrets.ENV_CONFIG }}

    steps:

    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set BRANCH_NAME
      id: prep
      run: |
        echo "BASE_BRANCH_NAME=$(git branch --show-current)" >> $GITHUB_ENV

    - name: Check Base Branch Name
      run: echo "Branch name is ${{ env.BASE_BRANCH_NAME }}"

    - name: Authenticate to Google Cloud
      uses: google-github-actions/auth@v2
      with:
        workload_identity_provider: "projects/${{ env.PROJECT_NUMBER }}/locations/global/workloadIdentityPools/github-pool/providers/github-provider"
        service_account: "cicd-sa@${{ env.PROJECT_ID }}.iam.gserviceaccount.com"

    - name: Set up Cloud SDK
      uses: google-github-actions/setup-gcloud@v2

    - name: Configure Docker to use gcloud as a credential helper
      run: |
        gcloud auth configure-docker us.gcr.io

    - name: Config .env
      run: |
        echo '${{ env.ENV_CONFIG }}' > .env

    - name: Create Service Account JSON File
      run: |
        mkdir -p ./.config/gcloud
        echo '${{ env.CICD_SA_JSON_FILE }}' > ./.config/gcloud/CICD_SA_JSON_FILE.json

    - name: Build Docker image
      run: |
        docker build -t us.gcr.io/${{ env.PROJECT_ID }}/${{ env.BASE_BRANCH_NAME }}/${{ env.PROJECT_NAME_SLUG }} .

    - name: Push Docker image to Google Container Registry
      run: |
        docker push us.gcr.io/${{ env.PROJECT_ID }}/${{ env.BASE_BRANCH_NAME }}/${{ env.PROJECT_NAME_SLUG }}

    - name: Deploy to Cloud Run
      run: |
        gcloud run deploy ${{ env.BASE_BRANCH_NAME }}-${{ env.PROJECT_NAME_SLUG }} \
          --image us.gcr.io/${{ env.PROJECT_ID }}/${{ env.BASE_BRANCH_NAME }}/${{ env.PROJECT_NAME_SLUG }} \
          --region ${{ env.REGION }} \
          --service-account "${{ env.CICD_SA_PRINCIPAL }}" \
          --memory=1024Mi \
          --cpu=1 \
          --concurrency=80 \
          --max-instances=1 \
          --add-cloudsql-instances=${{ env.PROJECT_ID }}:${{ env.REGION }}:${{ env.PROJECT_NAME_SLUG }}-postgres-instance \
          --update-env-vars INSTANCE_CONNECTION_NAME=${{ env.PROJECT_ID }}:${{ env.REGION }}:${{ env.PROJECT_NAME_SLUG }}-postgres-instance \
          --execution-environment gen2 \
          --add-volume=name=public,type=cloud-storage,bucket=${{ env.PROJECT_NAME_SLUG }}-${{ env.PROJECT_ID }}-public-uploads \
          --add-volume-mount=volume=public,mount-path=/usr/src/app/frontend/public/uploads/ \
          --allow-unauthenticated
```

#### Once you created this file, You need to setup the secret and variables in Github repository settings:

![Github Repository Setting for Secrets and variables related to Github Action Workflow](</assets/image%20(1).png>)

```
CICD_SA_PRINCIPAL: <CICD Service account principal>
CICD_SA_JSON_FILE: <CICD Service account JSON key file>
PROJECT_ID: <Your GCP Project ID>
PROJECT_NUMBER: <Your GCP Project Number>
PROJECT_NAME_SLUG: <Your Project Name (ex: bildap-co)>
REGION: <Your Region that you are deploying your website>
ENV_CONFIG: <Content of the .env file that you wish to use for your codebase on production environment>
```

:::info

For a better security practice: Please DO NOT push .env file in your Github repository as it contains tokens and secrets that can make your infrastructure vulnerable to hackers and attackers.

:::

### Allow Github action to Securely authenticate the workflow to GCP

To get detailed steps on setting up OpenID Connect (OIDC) with Google Cloud Platform, refer to the [GitHub documentation](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-google-cloud-platform) for guidance on securely configuring your deployments.

Here is the commands to speed up your process:

```sh
export GITHUB_POOL_NAME=github-pool
export GITHUB_PROVIDER_NAME=github-provider

# Create a Workload Identity Pool
gcloud iam workload-identity-pools create "${GITHUB_POOL_NAME}" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --display-name="GitHub Actions Pool for ${GITHUB_POOL_NAME}"

# Note the POOL_ID by listing pools
gcloud iam workload-identity-pools list --location="global"
# POOL_ID ex: 989898989898

# Create a Workload Identity Provider for GitHub
gcloud iam workload-identity-pools providers create-oidc "${GITHUB_PROVIDER_NAME}" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="${GITHUB_POOL_NAME}" \
  --display-name="GitHub Actions Provider" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="google.subject.startsWith('repo:<Github Org Name>/<Github Repository Name>:')"


# To validate the created provider
gcloud iam workload-identity-pools providers list --workload-identity-pool="${GITHUB_POOL_NAME}" --location="global" --project="${PROJECT_ID}"

# Allow the Workload Identity Provider to impersonate the service account
gcloud iam service-accounts add-iam-policy-binding \
  "${CICD_SA_PRINCIPAL}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/989898989898/locations/global/workloadIdentityPools/${GITHUB_POOL_NAME}/*"
```
