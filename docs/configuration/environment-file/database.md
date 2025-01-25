---
sidebar_position: 2
---

# Database

Here is an example of what the `DATABASE_URL` looks like:

```env
DATABASE_URL=postgresql://bildap:bildap@127.0.0.1:5432/bildap?schema=app
```

**Breakdown of the Connection String**

- `postgresql://`: Specifies the protocol to use for the connection.
- `bildap:bildap`: The username and password for the PostgreSQL database, separated by a colon.
- `127.0.0.1`: The host address of the PostgreSQL server. `127.0.0.1` refers to the local machine.
- `5432`: The port number on which the PostgreSQL server is running. The default port for PostgreSQL is `5432`.
- `bildap`: The name of the database you want to connect to.
- `?schema=app`: Specifies the schema within the database to use.

If you are deploying your website in Google Cloud Platform, Use the following to connect your website to Postgres hosted on GCP SQL.

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
