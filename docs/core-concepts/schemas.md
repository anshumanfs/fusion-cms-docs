---
sidebar_position: 2
---

# Schema Management

In Fusion CMS, you define your data structure using the Dashboard, and the system automatically generates the backend code (Models + GraphQL Schema).

## Naming Rules

Use simple identifier-style names:

- app names: `betaBlog`, `commerce`, `internalTools`
- collection names: `posts`, `orders`, `customers`
- singular names: `post`, `order`, `customer`
- field names: `title`, `slug`, `customerId`

Avoid spaces, punctuation-heavy names, and names that require quoting in JavaScript or GraphQL.

## Defining Schemas

1.  **Select an App**: Go to the App you want to modify.
2.  **Create Schema**: Click "New Schema" (e.g., `Product`).
3.  **Add Fields**: Define fields and their types.
    - `name` (String)
    - `price` (Int)
    - `isAvailable` (Boolean)
4.  **Directives & Relations**: You can link schemas (e.g., `Product` belongs to `Category`).

## Generated Artifacts

Once you save and build, Fusion CMS generates:

- **Database Model**:
    - For Mongo: A Mongoose Schema.
    - For SQL: A Sequelize Model or Table definition.
- **GraphQL TypeDef**: A standard GraphQL type definition.
    ```graphql
    type Product {
      id: ID!
      name: String
      price: Int
      isAvailable: Boolean
    }
    ```
- **GraphQL Resolvers**: Standard CRUD resolvers (`getProduct`, `createProduct`, `updateProduct`, `deleteProduct`).

For the current generator, operation names are collection-driven. A schema with singular `post` and plural `posts` emits operations shaped like:

```text
posts
post
count_posts
create_post
update_post
delete_post
```

## Advanced Schema Features

- **Validation**: Define required fields, default values, and unique constraints.
- **Indexing**: Optimize database performance by defining indexes on frequently queried fields.
- **Relationships**: Use references between collections/tables where supported by the selected template.
- **Enums and defaults**: Use them for stable application states such as `draft`, `published`, and `archived`.

## Beta Fixture Examples

The main app includes sample schemas that double as documentation and test fixtures:

```text
fusion-cms/server/__fixtures__/schemas/blog.mongo.json
fusion-cms/server/__fixtures__/schemas/blog.mysql.json
fusion-cms/server/__fixtures__/schemas/commerce.mysql.json
```

Use these as safe references when creating your first schema.
