---
sidebar_position: 3
---

# Generate And Query An API

This tutorial turns dashboard definitions into a generated API. It follows the beta-safe path: monolith mode, local metadata, and a small schema.

## Before You Start

You should already have:

- Fusion CMS running at `http://127.0.0.1:3001`
- a registered admin user
- an app created from the dashboard
- a database credential saved for that app

## The Generation Flow

<div className="flowRail" aria-label="Generated API flow">
  <div className="flowCard flowPulse"><span className="flowStep">1</span><strong>Schema</strong><p>Define fields in the dashboard.</p></div>
  <div className="flowArrow">→</div>
  <div className="flowCard flowPulse flowDelayOne"><span className="flowStep">2</span><strong>Templates</strong><p>Mongo or SQL templates emit source files.</p></div>
  <div className="flowArrow">→</div>
  <div className="flowCard flowPulse flowDelayTwo"><span className="flowStep">3</span><strong>Runtime</strong><p>App runner mounts the generated API.</p></div>
  <div className="flowArrow">→</div>
  <div className="flowCard flowPulse flowDelayThree"><span className="flowStep">4</span><strong>Clients</strong><p>Call GraphQL and REST endpoints.</p></div>
</div>

## Example Schema

Create a `posts` schema:

| Field | Type | Notes |
| --- | --- | --- |
| `title` | String | required |
| `slug` | String | unique |
| `body` | String | required |
| `status` | String | enum: draft, published, archived |
| `viewCount` | PositiveNumber or Number | default `0` |

For MongoDB, the fixture in the main app is a good reference:

```text
fusion-cms/server/__fixtures__/schemas/blog.mongo.json
```

For MySQL:

```text
fusion-cms/server/__fixtures__/schemas/blog.mysql.json
fusion-cms/server/__fixtures__/schemas/commerce.mysql.json
```

## Generated Operations

For a singular collection name `post` and plural collection name `posts`, Fusion CMS generates operations shaped like:

```graphql
query {
  posts {
    _id
    title
    status
  }
}
```

```graphql
mutation {
  create_post(input: {
    title: "Hello Beta"
    slug: "hello-beta"
    body: "First generated post"
    status: "draft"
  }) {
    _id
    title
    slug
  }
}
```

```graphql
mutation {
  update_post(
    filters: { slug: "hello-beta" }
    updates: { status: "published", viewCount: 1 }
  ) {
    _id
    status
    viewCount
  }
}
```

```graphql
mutation {
  delete_post(filters: { slug: "hello-beta" }) {
    _id
    slug
  }
}
```

SQL-backed generated apps use SQL-flavored arguments such as `where`, `limit`, and `offset`:

```graphql
query {
  posts(where: { status: "published" }, limit: 10, offset: 0) {
    id
    title
  }
}
```

## REST Surface

Fusion CMS can expose REST routes from GraphQL through Sofa API. Use REST for simpler clients and GraphQL for full query control.

REST availability depends on the generated app and runtime configuration. If REST is not visible for a generated app, verify that the app generated successfully and that the app runner mounted it.

## Validation Checklist

- [ ] App exists in the dashboard.
- [ ] Database credential exists for the selected environment.
- [ ] Schema names and field names are safe identifiers.
- [ ] Generated GraphQL schema compiles.
- [ ] Generated resolvers load.
- [ ] CRUD operations work.
- [ ] Access schema allows the current user to call the operation.

## Troubleshooting

If generation fails:

1. Check the server terminal for template errors.
2. Verify all required fields in the schema form.
3. Confirm the app database connection works.
4. Re-run:

```bash
npm run beta:check
```

