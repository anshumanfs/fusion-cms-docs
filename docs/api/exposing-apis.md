---
sidebar_position: 1
---

# Exposing APIs

Fusion CMS automatically exposes your generated schemas via two primary interfaces: GraphQL and REST.

## GraphQL Endpoint

The App Manager itself is available at:

```text
/appManager
```

Generated apps are mounted by the app runner according to the generated application name and runtime mode. Use the dashboard status/app pages to confirm the exact mounted route for your app.

### Tools
- **Deep Logic**: If configuring `GRAPHQL_MODULE=yoga`, you get the GraphiQL interface at this URL for testing queries.
- **Apollo**: If using Apollo, you can use the Apollo Sandbox.

## App Manager GraphQL Examples

Create an app:

```graphql
mutation {
  createApp(input: {
    appName: "betaBlog"
    dbType: mongo
    env: development
    mongo: {
      uri: "mongodb://127.0.0.1:27017/beta_blog"
    }
  }) {
    message
  }
}
```

List apps:

```graphql
query {
  getAppsData {
    appName
    dbType
    running
    schemas {
      originalCollectionName
    }
  }
}
```

## REST Endpoint (Sofa)

Fusion CMS uses **Sofa API** to automatically generate RESTful endpoints from your GraphQL schema. This is perfect for legacy clients or simple integrations.

The App Manager REST surface is available at:

```text
/rest/appManager
```

Generated app REST routes depend on the mounted generated app.

### Mapping
- **Queries** become `GET` requests.
- **Mutations** become `POST` requests.

## Swagger / OpenAPI

Documentation is key. Fusion CMS automatically generates Swagger/OpenAPI documentation for your REST endpoints.

- **Docs URL**: `/rest/<appName>/docs`
- **Spec URL**: `/rest/<appName>/openapi.json`

You can import the `openapi.json` into tools like Postman to instantly start testing your API.

## Authentication Headers

Generated APIs can be protected with either:

```http
Authorization: Bearer <token>
```

or:

```http
x-api-key: <api-key>
```

Access schemas still decide which endpoint the authenticated user can call.
