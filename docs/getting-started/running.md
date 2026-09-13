---
sidebar_position: 3
---

# Running the Server

Once you have installed dependencies and configured your environment, you can start the Fusion CMS server.

## Development Mode

To run the server with hot-reloading enabled (useful for developing custom middleware or modifying the core):

```bash
npm run dev
```

This starts the Next.js dashboard and backend API server through the integrated Express app.

With the beta example config, open:

```text
http://127.0.0.1:3001
```

If your `.env` changes `PORT`, use that port instead.

## Production Mode

For production environments, build the project first and then start it.

1.  **Build the Project**

    ```bash
    npm run build
    ```

    This compiles the TypeScript code and builds the Next.js application.

2.  **Start the Server**

    ```bash
    npm run start
    ```

## Beta Release Check

Before publishing or validating a beta candidate, run:

```bash
npm run beta:check
```

This runs:

1. App and server TypeScript checks.
2. Default Jest simulations.
3. Next.js production build.
4. Server TypeScript build.

Docker-backed live database tests are intentionally separate:

```bash
npm run test:integration
```

Without Docker, that command skips the integration suites cleanly. With Docker, it runs MongoDB, MySQL, and PostgreSQL CRUD smoke tests in containers.

## Accessing the Dashboard

With the default beta `.env.example`, the dashboard runs at:

```
http://127.0.0.1:3001
```

Register the first account from the authentication page, then use the dashboard to create applications, databases, schemas, and access rules.

## Health Checks

You can verify the server is running by hitting the ping endpoint:

- **URL**: `http://127.0.0.1:3001/ping`
- **Method**: `GET`
- **Response**: `200 OK`

The browser health page is available at:

```text
http://127.0.0.1:3001/health
```

## Runtime Endpoints

| Surface | Default path |
| --- | --- |
| Dashboard | `/` |
| Health page | `/health` |
| Ping JSON | `/ping` |
| App Manager GraphQL | `/appManager` |
| App Manager REST | `/rest/appManager` |
| Generated app GraphQL | App-specific route mounted by the app runner |
| Generated app REST | App-specific REST route generated from GraphQL where supported |
