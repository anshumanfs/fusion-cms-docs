---
sidebar_position: 3
---

# User Management

Fusion CMS comes with a built-in user management system to handle administrators and app users.

## User Roles

- **Admin**: The first registered user becomes a verified admin. Admins can manage apps, databases, schemas, access rules, and users.
- **User**: Regular users consume generated APIs. Their endpoint access is controlled through access schemas.
- **Additional roles**: The app config can define more roles, but beta flows focus on admin and user.

## Onboarding Users

### Registration
Users register through the dashboard auth page or the App Manager GraphQL mutation:

```graphql
mutation {
  registerUser(
    email: "admin@example.com"
    firstName: "Ada"
    lastName: "Lovelace"
    password: "passw0rd"
  ) {
    _id
    email
    role
    isVerified
  }
}
```

The first user is promoted to a verified admin.

### Verification
By default, new users may require email verification (configurable). The system sends a verification link via email (requires SMTP configuration).

## User Metadata
You can attach arbitrary metadata to users. This is useful for storing profile information, preferences, or app-specific data without modifying the core user table.

## Login And Refresh

```graphql
mutation {
  login(email: "admin@example.com", password: "passw0rd") {
    token
    refreshToken
  }
}
```

```graphql
mutation {
  requestNewToken(refreshToken: "<refresh-token>") {
    token
    refreshToken
  }
}
```

Use the token as:

```http
Authorization: Bearer <token>
```

## API Keys

API keys are intended for server-to-server integrations. They still map to users, so access schemas still decide what the key can call.

Use:

```http
x-api-key: <api-key>
```
