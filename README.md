# Fusion CMS Docs

Documentation site for Fusion CMS, built with Docusaurus.

## Installation

```bash
npm install
```

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Quality Checks

```bash
npm run typecheck
npm run build
```

Use both before handing off release documentation changes.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Structure

- `docs/getting-started`: install, config, running, CLI, troubleshooting.
- `docs/core-concepts`: databases, schemas, users.
- `docs/tutorials`: admin registration, app creation, generated API, access control.
- `docs/access-control`: authentication and access schemas.
- `docs/api`: generated API surfaces.
- `docs/advanced`: custom code and beta limitations.
