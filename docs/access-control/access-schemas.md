---
sidebar_position: 2
---

# Access Schemas

Access Schemas are the core of Fusion CMS's granular permission system. They define **who** can access **what** endpoint and **under what conditions**.

## Structure of an Access Schema

An Access Schema matches a user (by Email) to a specific App and Endpoint.

| Field | Description |
| :--- | :--- |
| `email` | The email of the user this rule applies to. |
| `appName` | The specific app (e.g., `Ecommerce`). |
| `endPointName` | The resolver name (e.g., `createProduct`). |
| `isAllowed` | The logic to determine access (see below). |
| `allowedInChain` | If `true`, subsequent resolvers in the chain skip checks. |

## Common Endpoint Names

For a `post` / `posts` schema:

| Operation | Endpoint name |
| --- | --- |
| List posts | `posts` |
| Read one post | `post` |
| Count posts | `count_posts` |
| Create post | `create_post` |
| Update post | `update_post` |
| Delete post | `delete_post` |

## The `isAllowed` Logic

The `isAllowed` field is powerful. It can be a simple boolean or a complex JavaScript function string.

### 1. Simple Boolean
- `"true"`: Access allowed.
- `"false"`: Access denied.

### 2. Function String (Advanced)
You can write a JavaScript function that evaluates dynamically at runtime.

**Format**:
```json
{
  "function": "(parent, args, context, info) => { ... }",
  "precedence": "pre" | "post"
}
```

- **Pre-Execution (`pre`)**: Runs *before* the resolver. Useful for validation.
    ```javascript
    // Example: Allow only if price is less than 1000
    (parent, args, context, info) => {
        if (args.price > 1000) throw new Error("Too expensive");
    }
    ```

- **Post-Execution (`post`)**: Runs *after* the resolver. Useful for filtering results.
    ```javascript
    // Example: Hide sensitive fields from the result
    (parent, args, context, info, result) => {
        delete result.secretField;
        return result;
    }
    ```

## Inheritance (`allowedInChain`)
If you have a chain of resolvers (e.g., `User -> Posts -> Comments`), setting `allowedInChain: true` on `User` can automatically grant access to `Posts` and `Comments` without separate checks, optimizing performance.

## Beta Fixture Examples

The main app includes access fixtures:

```text
fusion-cms/server/__fixtures__/access/admin-only.json
fusion-cms/server/__fixtures__/access/api-key-readonly.json
```

These show admin-only mutation access and read-only API-key access.
