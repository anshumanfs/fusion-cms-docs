---
sidebar_position: 5
---

# CLI Usage

The Fusion CMS CLI exists to make local project bootstrap repeatable. It clones the app, installs dependencies, and writes starter configuration files so a new developer can run the dashboard without knowing every setup detail.

## Install Or Run With NPX

```bash
npx fusion-cms-cli my-fusion-app
cd my-fusion-app
npm run dev
```

The beta package exposes the `fusion-cms` binary:

```bash
npx fusion-cms-cli --help
npx fusion-cms-cli --version
```

## What The CLI Does

<div className="flowRail compactFlow" aria-label="CLI install flow">
  <div className="flowCard"><span className="flowStep">1</span><strong>Validate</strong><p>Checks the requested project name.</p></div>
  <div className="flowArrow">→</div>
  <div className="flowCard"><span className="flowStep">2</span><strong>Clone</strong><p>Clones the public Fusion CMS repository.</p></div>
  <div className="flowArrow">→</div>
  <div className="flowCard"><span className="flowStep">3</span><strong>Install</strong><p>Runs dependency installation in the new folder.</p></div>
  <div className="flowArrow">→</div>
  <div className="flowCard"><span className="flowStep">4</span><strong>Configure</strong><p>Writes starter `.env` and `.secure.json` files.</p></div>
</div>

## Project Name Rules

For safety, the project name must be a simple directory name.

Allowed:

```bash
npx fusion-cms-cli beta-app
npx fusion-cms-cli fusion_cms_local
npx fusion-cms-cli fusion.cms
```

Avoid:

```bash
npx fusion-cms-cli ../outside-folder
npx fusion-cms-cli "my app"
npx fusion-cms-cli ""
```

The CLI rejects unsafe path-like values.

## Generated Config

The starter `.env` uses the beta dashboard port:

```env
PORT=3001
ROOT=http://127.0.0.1:3001
APP_MODE=monolith
GRAPHQL_MODULE=apollo
```

The starter `.secure.json` uses SQLite metadata:

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

## After Install

Run:

```bash
npm run beta:check
npm run dev
```

Then open:

```text
http://127.0.0.1:3001
```

Register the first admin user and continue with [Create Your First Application](../tutorials/1-create-application.md).
