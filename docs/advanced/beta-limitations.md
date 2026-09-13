---
sidebar_position: 2
---

# Beta Limitations

Fusion CMS beta is intended for local development, evaluation, and early feedback.

## Database Coverage

MongoDB and MySQL generation paths have the strongest beta coverage. Other connectors are available at the connector level, but should be validated in your own environment before relying on them.

Docker-backed live database tests are available through:

```bash
npm run test:integration
```

They are intentionally separate from `npm run beta:check`.

## Metadata Storage

The default beta setup uses SQLite for Fusion CMS metadata so the first run does not require an external database. For shared or production-like deployments, configure a durable metadata database and back it up.

## Security

The values in `config.json > secrets` that start with `dev-only-change-me-` are local-only defaults. Production-like environments reject those values at startup. Replace all secrets before exposing an instance publicly.

## Email

Account activation, invitation, and password-reset emails require SMTP configuration in `.secure.json`. Without SMTP, local beta flows can still be tested, but real email delivery is not available.

## Microservice Mode

Microservice mode depends on PM2 and additional process permissions. Monolith mode is the recommended beta path while validating generated APIs.

## Schema Changes

Advanced schema migration workflows are not guaranteed in beta. Treat generated apps as rebuildable artifacts and test destructive schema changes carefully.

## Release Hygiene

Before tagging a public beta:

- audit dependency lockfile churn
- confirm no private `.env` or `.secure.json` values are tracked
- run a fresh clone install check
- run `npm run beta:check` in the main app
- run docs `npm run typecheck` and `npm run build`
