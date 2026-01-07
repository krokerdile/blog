# @hyunu/tsconfig

Shared TypeScript configurations for all packages and apps in the monorepo.

## Available Configurations

### base.json
Base TypeScript configuration with common settings.

### nextjs.json
Configuration for Next.js applications.

```json
{
  "extends": "@hyunu/tsconfig/nextjs.json"
}
```

### node.json
Configuration for Node.js applications and packages.

```json
{
  "extends": "@hyunu/tsconfig/node.json"
}
```

### react.json
Configuration for React component libraries.

```json
{
  "extends": "@hyunu/tsconfig/react.json"
}
```
