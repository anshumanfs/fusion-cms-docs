---
sidebar_position: 1
---

# Custom Code & Middleware

While Fusion CMS generates most of the code, you often need to insert custom logic.

## Custom Middleware

The `server/middlewares` directory is where global custom logic resides.

1.  **Create Middleware**: Write a standard Express middleware function.
    ```typescript
    // server/middlewares/myLogger.ts
    import { Request, Response, NextFunction } from 'express';
    
    export const myLogger = (req: Request, res: Response, next: NextFunction) => {
        console.log("Request received!");
        next();
    };
    ```

2.  **Register Middleware**: Import and use it in `server/app.ts`.

## Custom Resolvers

You can override or extend generated resolvers.
- Navigate to `server/apps/<appName>/custom_resolvers`.
- Add your logic here. The system merges custom resolvers with generated ones.

## Extending the Core

If you need to change how Apps are actively built or deployed, look into:
- **`server/controllers/manageApp.ts`**: Handles the build logic.
- **`server/appRunner.ts`**: Handles the startup and process management logic.
