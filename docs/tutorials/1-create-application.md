---
sidebar_position: 1
---

# Create Application

Applications serve as data sources in **Fusion CMS**. Each data source onboarded to Fusion automatically creates an independent application, separate from other onboarded applications or data sources.

The public beta focuses on the MongoDB and MySQL generation paths, with connector support for additional SQL databases continuing to harden.

- MongoDB
- MySQL
- PostgreSQL
- SQLite
- MariaDB
- MsSQL
- DB2

## Before You Start

- Start Fusion CMS with `npm run dev`.
- Register the first admin user.
- Open the dashboard at `http://127.0.0.1:3001/dashboard`.
- Have a database connection string ready for the data source you want to expose.

## Create The App

1. Open **Databases** in the dashboard.
2. Choose the database type.
3. Enter an app name, environment, and connection settings.
4. Use **Test Connection** before saving when a live database is available.
5. Save the database configuration.

Fusion CMS stores the connection under the selected app name and keeps the generated app stopped by default.

## Add A Schema

After creating the app, open **Schemas** and add a collection/table schema. A small MongoDB example:

```json
{
  "title": {
    "type": "String",
    "required": true
  },
  "views": {
    "type": "Number"
  }
}
```

Fusion CMS uses the schema to generate model files, GraphQL schema files, resolvers, middleware placeholders, and runtime app metadata.

## Run And Query

Start the generated app from the dashboard. In monolith mode, the GraphQL endpoint is available under:

```text
http://127.0.0.1:3001/graphql/<appName>
```

Generated CRUD operations follow this shape:

- `posts`
- `post`
- `count_posts`
- `create_post`
- `update_post`
- `delete_post`
