---
sidebar_position: 1
---

# Installation

This guide installs the beta locally with safe defaults. The fastest path uses SQLite for Fusion CMS metadata, so you do not need MongoDB, MySQL, or PostgreSQL just to open the dashboard.

## Prerequisites

Before you begin, install:

- **Node.js**: version 20 is recommended for the current Next.js dependency set.
- **npm**: bundled with Node.js.
- **Git**: required for manual clone and CLI scaffold flows.
- **Docker**: optional, only for `npm run test:integration`.
- **Application database**: optional until you create a generated app that needs MongoDB, MySQL, or another external database.

## Manual Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/anshumanfs/fusion-cms.git
    cd fusion-cms
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Prepare Local Configuration**

    Fusion CMS requires environment and private runtime configuration files.

    ```bash
    cp .env.example .env
    cp .secure.example.json .secure.json
    ```

    The default `.secure.example.json` uses SQLite for local metadata storage, so you can start without setting up an external metadata database.

4.  **Run the Beta Gate**

    ```bash
    npm run beta:check
    ```

    This command verifies the main app TypeScript checks, Jest simulations, Next.js production build, and server build. In restricted terminals, Next/Turbopack may need permission to spawn helper processes.

## CLI Installation

The beta CLI package can scaffold a local Fusion CMS checkout:

```bash
npx fusion-cms-cli my-fusion-app
cd my-fusion-app
npm run dev
```

The CLI clones the public repository, installs dependencies, and writes starter `.env` and `.secure.json` files. See [CLI Usage](./cli.md) for details.

## What Gets Created

After setup you should have:

| File | Purpose |
| --- | --- |
| `.env` | Local runtime variables such as `PORT`, `ROOT`, and GraphQL mode. |
| `.secure.json` | Private metadata database and SMTP configuration. Keep this ignored. |
| `.temp/fusion-cms-metadata.sqlite` | Created automatically when using SQLite metadata storage. |

## Next Step

Continue with [Configuration](./configuration.md), then [Running the Server](./running.md).
