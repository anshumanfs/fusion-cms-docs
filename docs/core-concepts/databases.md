---
sidebar_position: 1
---

# Database Onboarding

Fusion CMS is data-agnostic. It can connect to multiple databases of different types within the same project.

There are two different database concepts:

| Concept | What it stores | Beta default |
| --- | --- | --- |
| Metadata database | Fusion CMS users, apps, schemas, credentials, access rules, config | SQLite |
| Application database | Your generated app data | MongoDB or SQL database you configure |

Keep these separate in your mental model. A fresh beta install can open the dashboard with only SQLite metadata. A generated API needs its own application database credential.

## Supported Databases

Currently, Fusion CMS supports:
- **MongoDB**: Via Mongoose.
- **SQL Databases**: Via Sequelize or native drivers.
    - MySQL
    - PostgreSQL
    - SQLite
    - MariaDB
    - MSSQL
    - Oracle

## Onboarding a New Database

You don't need to write connection code manually.

1.  **Go to Dashboard**: Navigate to the **Databases** tab.
2.  **Add New Database**: Click "Add Database".
3.  **Select Type**: Choose your database provider (e.g., MongoDB).
4.  **Enter Credentials**: Provide the connection string or host details.
    - For Mongo: `mongodb://user:pass@host:port/dbname`
    - For SQL: Host, Port, Username, Password, Database Name.
5.  **Test Connection**: The system will attempt to connect.
6.  **Save**: Once saved, this database is available for use in your Apps.

## Architecture Note
The connection logic resides in `server/connectors`. When an app is built, it pulls the specific connector logic required for its assigned database.

## Metadata Database Fallback

If `.secure.json` is missing, Fusion CMS uses:

```text
.temp/fusion-cms-metadata.sqlite
```

This fallback is intended for local beta use. For shared environments, use an explicit `.secure.json` and back up the metadata database.

## Live Integration Tests

Docker-backed database tests are intentionally not part of the normal beta gate:

```bash
npm run beta:check
```

To run live database smoke tests:

```bash
npm run test:integration
```

This starts MongoDB, MySQL, and PostgreSQL containers when Docker is available. If Docker is not available, the suites skip cleanly.
