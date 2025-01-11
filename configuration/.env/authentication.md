# Authentication

To set up Google authentication, obtain your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` by following Google's instructions.

```properties
JWT_COOKIE_EXPIRES_IN=12h
COOKIE_SECURE=true

GOOGLE_CLIENT_ID=<your_google_client_id_here>
GOOGLE_CLIENT_SECRET=<your_google_client_secret_here> 
GOOGLE_APPLICATION_CREDENTIALS=<your_google_application_credentials_here>
```

[Get your Google API client ID](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#get_your_google_api_client_id)

In addition **Appointment system** uses a service account that allows `googleapis` library to create calendar.&#x20;

In order for this feature to work, you need to enable the calendar api in google cloud.

[Enable Google Calendar API](https://console.cloud.google.com/apis/library/calendar-json.googleapis.com) or run the following command

```sh
gcloud services enable calendar-json.googleapis.com --project=<your GCP project ID>
```

Make sure you assign the correct permissions to your service account, Please follow [this medium link](https://medium.com/iceapple-tech-talks/integration-with-google-calendar-api-using-service-account-1471e6e102c8).

To create service account in GCP, please follow the [#create-service-account](../../deployment/google-cloud-platform.md#create-service-account "mention")



**Related Links:**

* [Google Calendar Settings](https://calendar.google.com/calendar/u/2/r/settings) > at the `Settings for my calendars` click on your project
* [Domain Wide Delegation](https://admin.google.com/u/2/ac/owl/domainwidedelegation) > Create New Domain using your Client\_id and following scopes:
  * https://www.googleapis.com/auth/calendar
  * https://www.googleapis.com/auth/calendar.events
  * https://www.googleapis.com/auth/admin.directory.resource.calendar
