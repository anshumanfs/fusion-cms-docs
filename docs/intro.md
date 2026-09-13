---
sidebar_position: 1
---

# Introduction

Fusion CMS is an open-source headless CMS and API builder for teams that want to ship database-backed APIs quickly. It gives you a dashboard for onboarding databases, defining schemas, managing users, and exposing generated GraphQL and REST endpoints.

<div className="flowRail" aria-label="Fusion CMS overview flow">
  <div className="flowCard flowPulse">
    <span className="flowStep">1</span>
    <strong>Install</strong>
    <p>Clone or scaffold the app, copy the example config, and start the local dashboard.</p>
  </div>
  <div className="flowArrow">→</div>
  <div className="flowCard flowPulse flowDelayOne">
    <span className="flowStep">2</span>
    <strong>Model</strong>
    <p>Create apps, databases, schemas, users, and access rules from the dashboard.</p>
  </div>
  <div className="flowArrow">→</div>
  <div className="flowCard flowPulse flowDelayTwo">
    <span className="flowStep">3</span>
    <strong>Generate</strong>
    <p>Fusion CMS writes models, GraphQL schemas, resolvers, REST routes, and middleware hooks.</p>
  </div>
  <div className="flowArrow">→</div>
  <div className="flowCard flowPulse flowDelayThree">
    <span className="flowStep">4</span>
    <strong>Serve</strong>
    <p>Run generated APIs in monolith mode for beta, then harden configuration before release.</p>
  </div>
</div>

## What You Can Build

## Key Features

- **Multi-database APIs**: Use SQLite for local metadata and generate app APIs for MongoDB and SQL-style databases.
- **Dashboard-first modeling**: Create apps, database credentials, schemas, access rules, and users without hand-writing boilerplate.
- **Generated GraphQL and REST**: Use GraphQL as the primary surface and REST through Sofa API where supported.
- **Auth and access control**: Use JWTs, API keys, roles, and access schemas to protect endpoints.
- **Beta-ready release gate**: Run `npm run beta:check` to typecheck, test, and build the app.
- **Integration test lane**: Keep fast beta checks separate from Docker-based live database smoke tests.

## Repository Layout

Fusion CMS currently ships as a multi-package workspace-style repository:

| Path | Purpose |
| --- | --- |
| `fusion-cms` | Main Next.js dashboard, Express runtime, generated API templates, tests, and release gate. |
| `fusion-cms-cli` | CLI installer that clones the app and writes starter `.env` / `.secure.json` files. |
| `fusion-cms-docs` | Docusaurus documentation site. |

## Core Runtime Loop

<div className="runtimeLoop" aria-label="Runtime loop">
  <div><strong>Metadata DB</strong><span>apps, users, schemas, credentials, access rules</span></div>
  <div><strong>Dashboard</strong><span>create and validate runtime definitions</span></div>
  <div><strong>Templates</strong><span>Mongo and SQL generators create API files</span></div>
  <div><strong>App Runner</strong><span>mount generated apps into the server</span></div>
  <div><strong>Clients</strong><span>call GraphQL, REST, and auth endpoints</span></div>
</div>

## Getting Started

For a new local beta setup, follow these in order:

1. [Install Fusion CMS](./getting-started/installation.md)
2. [Configure `.env` and `.secure.json`](./getting-started/configuration.md)
3. [Run the server](./getting-started/running.md)
4. [Register the first admin](./tutorials/0-register-admin.md)
5. [Create your first application](./tutorials/1-create-application.md)
6. [Generate and query an API](./tutorials/2-generate-api.md)

For release work, keep [beta limitations](./advanced/beta-limitations.md) and [troubleshooting](./getting-started/troubleshooting.md) nearby.
