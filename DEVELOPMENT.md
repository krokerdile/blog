# Development Workflow Guide

This guide covers common development workflows in the Hyunu Blog monorepo.

## 📋 Table of Contents

- [Initial Setup](#initial-setup)
- [Daily Development](#daily-development)
- [Adding New Packages](#adding-new-packages)
- [Adding New Apps](#adding-new-apps)
- [Working with UI Components](#working-with-ui-components)
- [Testing](#testing)
- [Deployment](#deployment)

## Initial Setup

### 1. Install Dependencies

```bash
# Install yarn if you haven't already
npm install -g yarn

# Install all dependencies
yarn install
```

### 2. Verify Installation

```bash
# Build all packages and apps
yarn build
```

## Daily Development

### Start All Apps

```bash
# Start all apps in development mode (blog + backend)
yarn dev
```

This will start:
- Blog frontend at `http://localhost:3000`
- Backend API at `http://localhost:3001`

### Start Specific App

```bash
# Start only the blog
yarn workspace @hyunu/blog dev

# Start only the backend
yarn workspace @hyunu/backend dev
```

### Build Specific App

```bash
# Build the blog
yarn workspace @hyunu/blog build

# Build the backend
yarn workspace @hyunu/backend build

# Build the UI package
yarn workspace @hyunu/ui build
```

## Adding New Packages

### 1. Create Package Directory

```bash
mkdir -p packages/new-package/src
cd packages/new-package
```

### 2. Create package.json

```json
{
  "name": "@hyunu/new-package",
  "version": "0.0.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "@hyunu/tsconfig": "workspace:*",
    "typescript": "^5.3.3"
  }
}
```

### 3. Create tsconfig.json

```json
{
  "extends": "@hyunu/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### 4. Install Dependencies

```bash
# From the root directory
yarn install
```

## Adding New Apps

### Next.js App

```bash
cd apps
npx create-next-app@latest new-app --typescript --tailwind --app
```

Then update `package.json`:

```json
{
  "name": "@hyunu/new-app",
  "dependencies": {
    "@hyunu/ui": "workspace:*"
  },
  "devDependencies": {
    "@hyunu/tsconfig": "workspace:*"
  }
}
```

### Node.js/Express App

```bash
mkdir -p apps/new-api/src
cd apps/new-api
```

Create `package.json`:

```json
{
  "name": "@hyunu/new-api",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@hyunu/tsconfig": "workspace:*",
    "@types/express": "^4.17.21",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3"
  }
}
```

## Working with UI Components

### Creating a New Component

1. Create the component file in `packages/ui/src/`:

```tsx
// packages/ui/src/NewComponent.tsx
import * as React from 'react';

export interface NewComponentProps {
  // Your props here
}

export const NewComponent: React.FC<NewComponentProps> = (props) => {
  return <div>New Component</div>;
};
```

2. Export it in `packages/ui/src/index.tsx`:

```tsx
export * from './NewComponent';
```

3. Build the UI package:

```bash
yarn workspace @hyunu/ui build
```

### Using UI Components in Apps

```tsx
import { Button, Card, NewComponent } from '@hyunu/ui';

function MyPage() {
  return (
    <Card title="Example">
      <NewComponent />
      <Button>Click me</Button>
    </Card>
  );
}
```

## Testing

### Lint All Packages

```bash
yarn lint
```

### Format All Files

```bash
yarn format
```

### Clean Build Artifacts

```bash
yarn clean
```

## Deployment

### Build for Production

```bash
# Build all apps
yarn build
```

### Blog Deployment (Vercel)

The blog can be deployed to Vercel:

```bash
cd apps/blog
vercel
```

### Backend Deployment

The backend can be deployed to various platforms:

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY apps/backend/package.json .
COPY apps/backend/dist ./dist
RUN npm install --production
CMD ["node", "dist/index.js"]
```

**Environment Variables:**
```bash
PORT=3001
NODE_ENV=production
```

## Tips and Tricks

### Dependency Management

```bash
# Add dependency to specific package
yarn workspace @hyunu/blog add package-name

# Add dev dependency to specific package
yarn workspace @hyunu/blog add -D package-name

# Add dependency to all packages
# (requires adding to each workspace individually in Yarn v1)
yarn workspace @hyunu/blog add package-name
yarn workspace @hyunu/backend add package-name
yarn workspace @hyunu/ui add package-name

# Update all dependencies
yarn upgrade
```

### Workspace Protocol

Use `*` to reference internal packages in Yarn v1:

```json
{
  "dependencies": {
    "@hyunu/ui": "*"
  }
}
}
```

### Turbo Cache

Turbo caches build outputs for faster rebuilds:

```bash
# Clear turbo cache
rm -rf .turbo
```

### Debugging

```bash
# Check workspace structure
yarn ls --depth 0

# Check why a package is installed
yarn why package-name

# Check for circular dependencies
yarn exec madge --circular --extensions ts,tsx apps/blog
```

## Common Issues

### Issue: Package not found

**Solution:** Run `yarn install` from the root directory.

### Issue: Build fails

**Solution:** Clean and rebuild:
```bash
yarn clean
yarn build
```

### Issue: TypeScript errors in IDE

**Solution:** Restart your TypeScript server or reload your IDE.

### Issue: Port already in use

**Solution:** Kill the process using the port:
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```
