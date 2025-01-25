---
sidebar_position: 1
---

# Run Dev/Production Mode

## Install Dependancies

To prepare the CLI environment, Please run the following commands to get started:

```bash
nvm install
npm install

npm install prisma -g
```

## Run in Dev Mode

### To run migration for database models

```bash
# Run this command if you have any changes to prisma/schema.prisma
npm run migrate:dev
```

### Seeding the models

```bash
npm run migrate:seed
```

#### **Dummy Data**

If you wish to create dummy data in your database run the following script with `ENABLED_DUMMY_DATA` environment variable.

```bash
export ENABLE_DUMMY_DATA=true

npm run migrate:seed
```

#### **Truncate Data**

If you wish to truncate (delete) data from database before seeding, run the seeding script with `ENABLE_TRUNCATE` environment variable.

```bash
export ENABLE_TRUNCATE_DATA=true

npm run migrate:seed
```

### Start dev mode

```bash
# To start the Next.js application
npm run dev
```

The application is set up to host on port `3000`. Visit [http://localhost:3000](http://localhost:3000) with your browser.

## Run in Production Mode

### To Build/Compile the project

```sh
npm run build
```

### To Start in production mode

```sh
npm run start
```

This process run the **Migration**, **Seed** and then start the project in production mode.

To Customize the process, refer to `package.json` file.
