---
sidebar_position: 4
---

# Protect A Generated API

Access schemas connect a user, an app, and a generated endpoint. They decide whether a request can continue before and after resolver execution.

## The Access Flow

<div className="flowRail" aria-label="Access control flow">
  <div className="flowCard flowPulse"><span className="flowStep">1</span><strong>Authenticate</strong><p>JWT or API key identifies the caller.</p></div>
  <div className="flowArrow">→</div>
  <div className="flowCard flowPulse flowDelayOne"><span className="flowStep">2</span><strong>Match Rule</strong><p>Access schema matches email, app, and endpoint.</p></div>
  <div className="flowArrow">→</div>
  <div className="flowCard flowPulse flowDelayTwo"><span className="flowStep">3</span><strong>Pre-check</strong><p>Block unsafe calls before resolver execution.</p></div>
  <div className="flowArrow">→</div>
  <div className="flowCard flowPulse flowDelayThree"><span className="flowStep">4</span><strong>Post-check</strong><p>Return or filter the resolver result.</p></div>
</div>

## Create A Read Rule

For a generated `posts` query:

| Field | Value |
| --- | --- |
| Email | `admin@example.com` |
| App Name | `betaBlog` |
| Endpoint Name | `posts` |
| Is Allowed | `true` |
| Allowed In Chain | `true` |

This lets the selected user call the list query.

## Create A Mutation Rule

For a generated create mutation:

| Field | Value |
| --- | --- |
| Email | `editor@example.com` |
| App Name | `betaBlog` |
| Endpoint Name | `create_post` |
| Is Allowed | `true` |
| Allowed In Chain | `true` |

Mutation endpoint names generally follow this pattern:

```text
create_<singularCollectionName>
update_<singularCollectionName>
delete_<singularCollectionName>
```

Query endpoint names generally follow:

```text
<pluralCollectionName>
<singularCollectionName>
count_<pluralCollectionName>
aggregate_<pluralCollectionName>
```

## Deny A Dangerous Operation

For read-only users, explicitly deny destructive operations:

| Field | Value |
| --- | --- |
| Email | `viewer@example.com` |
| App Name | `betaBlog` |
| Endpoint Name | `delete_post` |
| Is Allowed | `false` |
| Allowed In Chain | `false` |

## Test With A Token

Log in and use the returned token:

```http
Authorization: Bearer <token>
```

Then call the generated endpoint. If access is denied, verify:

- user email matches the rule
- app name matches exactly
- endpoint name matches the generated resolver name
- token is valid and not expired
- the user is not blocked

## Test With An API Key

Use API-key authentication for server-to-server calls:

```http
x-api-key: <api-key>
```

API keys are tied to users, so access schemas still apply.

## Fixture References

The main app includes beta fixtures:

```text
fusion-cms/server/__fixtures__/access/admin-only.json
fusion-cms/server/__fixtures__/access/api-key-readonly.json
fusion-cms/server/__fixtures__/schemas/access-control.json
```

Use them as examples for admin-only and read-only access rules.

