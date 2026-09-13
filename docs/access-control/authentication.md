---
sidebar_position: 1
---

# Authentication

Fusion CMS uses a dual-method authentication system to secure APIs.

Auth applies to the App Manager and generated app APIs. Public auth operations such as registration, login, token refresh, and password reset are allowed without an existing token.

## Authentication Methods

### 1. Bearer Token (JWT)
This is the standard authentication method for client-side applications (React, Mobile Apps).
- **Header**: `Authorization: Bearer <token>`
- **Flow**:
    1.  User logs in via `/auth/login`.
    2.  Server returns a JWT.
    3.  Client sends this JWT in subsequent requests.
- **Validation**: Fails if the token is expired, invalid, or if the user is blocked/unverified.

### 2. API Key
This is intended for server-to-server communication or third-party integrations.
- **Header**: `x-api-key: <your-api-key>`
- **Flow**:
    1.  Admin generates an API Key for a user in the Dashboard.
    2.  The external service uses this key to authenticate.
- **Security**: The key is hashed using HMAC SHA256 before storage.

## Middleware Logic
The `authMiddleware` automatically checks for these headers.
- If `Authorization` is present, it attempts Token Auth.
- If `x-api-key` is present, it attempts API Key Auth.
- If neither is present (and the endpoint is not public), it throws `401 Unauthorized`.

## Public Operations

The public auth allowlist includes flows such as:

- `registerUser`
- `login`
- `requestNewToken`
- `requestPasswordChangeEmail`
- `forgotPassword`
- account activation / validation flows

All dashboard and management operations require authentication after the first login.

## Password Reset

Password reset has two pieces:

1. Request a password-reset email.
2. Submit a valid reset token with the new password.

Real delivery requires SMTP settings in `.secure.json`. Without SMTP, beta tests can still exercise the code path through a local JSON mail transport.
