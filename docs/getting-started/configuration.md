---
sidebar_position: 2
---

# Configuration

Fusion CMS uses two layers of configuration:

- `.env` for public local runtime settings.
- `.secure.json` for private metadata database, SMTP, and future sensitive configuration.

For beta, the app can start even when `.secure.json` is missing by falling back to a local SQLite metadata database. Use the explicit example file when you want predictable local behavior.

## Environment Variables

Create a `.env` file in the root directory of the project.

### Core Settings

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | The port the server runs on. | `3001` |
| `NODE_ENV` | Environment mode (`development` or `production`). | `development` |
| `APP_MODE` | Runtime mode: `monolith` or `microservice`. | `monolith` |
| `GRAPHQL_MODULE`| The GraphQL engine to use: `apollo` or `yoga`. | `apollo` |
| `CIPHER_KEY` | Secret used when encrypting stored database credentials. | required for production |
| `ROOT` | Public root URL used in links and email templates. | `http://127.0.0.1:3001` |
| `ENABLE_SEQUELIZE_LOGGING` | Enables Sequelize query logs when set to `true`. | `false` |

### Database Configuration

You don't need to define every application database connection in `.env`. The Fusion CMS dashboard can onboard databases dynamically. However, Fusion CMS itself needs a **metadata database** to store apps, users, schemas, credentials, and access rules.

Metadata configuration lives in `.secure.json`.

```json
{
  "db": {
    "metadataDb": {
      "type": "sqlite",
      "orm": "sequelize",
      "configs": {
        "storage": ".temp/fusion-cms-metadata.sqlite"
      }
    }
  }
}
```

If `.secure.json` is missing, the beta server falls back to the same SQLite metadata store for local development.

You can also point the loader at a different configuration root:

```bash
FUSION_CMS_CONFIG_ROOT=/path/to/config npm run dev
```

Fusion CMS reads `.secure.json` from that directory first. This is useful for smoke tests and temporary release-candidate checks.

### Security Secrets

Secrets are used for signing tokens and encrypting sensitive data. The public beta ships development defaults in `config.json`; replace them before exposing an instance publicly. Values that start with `dev-only-change-me-` are for local development only, and production-like environments reject them at startup.

```env
CIPHER_KEY=replace-with-a-32-character-secret
```

Before public deployment, rotate:

- token signing secrets
- refresh-token secrets
- `CIPHER_KEY`
- SMTP credentials
- database passwords
- any application API keys

## GraphQL Engine: Apollo vs Yoga

Fusion CMS supports two powerful GraphQL engines. You can switch between them by setting the `GRAPHQL_MODULE` environment variable.

- **Apollo Server** (`apollo`): The industry-standard GraphQL server. Robust, widely used, and great for enterprise setups.
- **GraphQL Yoga** (`yoga`): A lightweight, modern, and high-performance server with support for newer standards and easier extensibility.

```bash
# To use GraphQL Yoga
GRAPHQL_MODULE=yoga
```

## Running Mode: Monolith vs Microservices

- **Monolith**: Runs all apps and the App Manager in a single process. Easier for development and smaller deployments.
- **Microservice**: Runs each app in its own isolated process using PM2. Ideal for scalability and isolation.

```bash
# To run in microservice mode
APP_MODE=microservice
```

Monolith mode is the recommended beta path until your generated app flows are fully smoke-tested.
