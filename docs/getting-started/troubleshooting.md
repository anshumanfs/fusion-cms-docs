---
sidebar_position: 4
---

# Troubleshooting

Use this page when installation, runtime, database, auth, or generated API checks behave differently from the quickstart.

## Missing `.secure.json`

Fusion CMS falls back to local SQLite metadata when `.secure.json` is missing. For an explicit local setup, copy the example file:

```bash
cp .secure.example.json .secure.json
```

## Production Refuses To Start

Production-like environments reject development-only secrets. Replace every `dev-only-change-me-*` value in `config.json > secrets`.

## Next/Turbopack Build Fails In A Restricted Environment

Next.js and PostCSS may need to spawn helper processes during production builds. If this happens inside a restricted shell, rerun the build in a normal local terminal:

```bash
npm run beta:check
```

In agent sandboxes, the error may mention helper processes or local port binding. This is an environment permission issue, not usually an app-code issue.

## SQLite Metadata File Cannot Be Created

The default metadata database writes to `.temp/fusion-cms-metadata.sqlite`. Confirm the project directory is writable and that `.temp` is not blocked by filesystem permissions.

Useful checks:

```bash
ls -la .temp
touch .temp/write-check
```

## MongoDB Connection Fails

Check that the MongoDB URI is reachable from the machine running Fusion CMS. For local MongoDB, confirm the service is running and the URI uses the correct database name.

Common causes:

- wrong database name in URI
- local MongoDB service is stopped
- network firewall blocks Atlas or remote MongoDB
- credentials require URL escaping

## MySQL/PostgreSQL Connection Fails

Confirm host, port, username, password, and database name. Also check that the database allows connections from your machine and that the selected connector package is installed.

Common checks:

```bash
nc -vz 127.0.0.1 3306
nc -vz 127.0.0.1 5432
```

For Docker-backed integration tests:

```bash
docker info
npm run test:integration
```

If Docker is unavailable, the integration test command skips container suites instead of failing the beta gate.

## Password Reset Email Does Not Arrive

Password reset requires SMTP settings in `.secure.json`. Verify the SMTP host, port, username, password, and provider-specific app password requirements.

When SMTP is not configured, the beta mailer uses a safe local JSON transport for development checks. That verifies code paths but does not deliver real email.

## Dashboard Logs Out Or Redirects

Protected dashboard routes require a valid token in local storage. If the dashboard redirects to `/auth?tab=login`, log in again. If the issue persists, clear local storage for the site and repeat the login flow.

## Generated API Does Not Rebuild

Check:

- the app exists in the dashboard
- database credentials are saved for the selected environment
- at least one schema exists for the app
- schema and collection names use safe identifier-style names
- the server process can write generated files

Then rerun the beta gate:

```bash
npm run beta:check
```
