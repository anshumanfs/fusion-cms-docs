---
sidebar_position: 1
---

# Architecture

Fusion CMS is designed with a modular architecture that separates the core runtime from the business logic of individual applications (or "micro-apps").

<div className="architectureMap" aria-label="Fusion CMS architecture map">
  <div className="architectureNode primary">Next.js Dashboard</div>
  <div className="architectureLine"></div>
  <div className="architectureNode">Express Runtime</div>
  <div className="architectureLine"></div>
  <div className="architectureNode">Metadata DB</div>
  <div className="architectureNode">Template Generators</div>
  <div className="architectureNode">Generated Apps</div>
  <div className="architectureNode">GraphQL + REST APIs</div>
</div>

## Core Components

### 1. The Server Core (`server/`)
This is the heart of Fusion CMS. It handles:
- **App Runner (`appRunner.ts`)**: The orchestrator that initializes applications. It decides whether to run them in the same process (Monolith) or spawn new processes (Microservices).
- **Controllers**: Manage the lifecycle of apps, databases, and configuration.
- **Middlewares**: Global middleware for Authentication (`auth.ts`), Access Control (`accessManager.ts`), and Logging.

### 2. Applications (`apps/`)
When you create a new "App" in Fusion CMS (e.g., "E-commerce", "Blog"), the system generates a dedicated folder for it in `server/apps/`. Each app contains its own:
- **Resolvers**: GraphQL logic.
- **Schemas**: GraphQL TypeDefs.
- **Server Entry Support**: Scripts to run independently.

### 3. Metadata Database

The metadata database stores Fusion CMS state:

- dashboard users
- auth codes
- application definitions
- database credentials
- schema definitions
- access schemas
- configuration records

The beta default is SQLite at `.temp/fusion-cms-metadata.sqlite`. External metadata databases can be configured through `.secure.json`.

## Runtime Modes

Fusion CMS supports two distinct runtime modes, controlled by the `APP_MODE` environment variable.

### Monolith Mode
In this mode, the main Express server mounts the dashboard, App Manager, and generated apps in a single process.
- **Pros**: Low memory footprint, easy debugging, shared resources.
- **Cons**: A crash in one app brings down the whole system.
- **Beta recommendation**: Use this mode while validating generated APIs.

### Microservices Mode
In this mode, Fusion CMS uses **PM2** to spawn a separate Node.js process for each active application.
- **Pros**: Complete isolation. If "Blog" crashes, "Store" keeps running. Better CPU utilization.
- **Cons**: Higher memory usage (each app has its own V8 instance).
- **Beta caution**: Requires PM2 and process permissions.

## App Generation Process

Fusion CMS uses a template-based generation system.
1. **Define**: You define schemas and databases in the Dashboard.
2. **Build**: The system reads these definitions from the Metadata Database.
3. **Generate**: It uses templates such as `server/templates/mongo` and `server/templates/mysql`.
4. **Mount**: The app runner mounts generated schemas/resolvers in monolith mode.
5. **Serve**: Clients call GraphQL and REST endpoints.

## Test Lanes

Fusion CMS uses two test lanes:

| Command | Purpose |
| --- | --- |
| `npm run beta:check` | Fast beta gate: typecheck, Jest simulations, Next build, server build. |
| `npm run test:integration` | Docker-backed live database smoke tests for MongoDB, MySQL, and PostgreSQL. |

The integration lane skips cleanly if Docker is unavailable.
