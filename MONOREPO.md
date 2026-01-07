# Monorepo Structure Documentation

## Overview

This monorepo uses npm workspaces to manage multiple packages in a single repository. This approach provides several benefits:

- **Code sharing**: Common dependencies are hoisted to the root
- **Independent deployment**: Each package can be deployed separately
- **Consistent tooling**: Shared configuration across packages
- **Isolated concerns**: Clear separation between public and administrative functions

## Package Structure

```
hyunu_blog/
├── package.json              # Root workspace configuration
├── package-lock.json         # Lock file for all dependencies
├── .gitignore               # Ignore patterns for the entire monorepo
├── README.md                # Main documentation
└── packages/
    ├── frontend/            # Main public-facing application
    │   ├── app/            # Next.js app directory
    │   ├── public/         # Static assets
    │   ├── package.json    # Frontend-specific configuration
    │   └── ...
    └── backoffice/         # Administrative dashboard
        ├── app/            # Next.js app directory
        ├── public/         # Static assets
        ├── package.json    # Backoffice-specific configuration
        └── ...
```

## Development Workflow

### Installing Dependencies

From the root directory:
```bash
npm install
```

This will install dependencies for all packages in the workspace.

### Running Applications

**Run both applications simultaneously:**
```bash
npm run dev
```

**Run frontend only:**
```bash
npm run dev:frontend
```
Access at: http://localhost:3000

**Run backoffice only:**
```bash
npm run dev:backoffice
```
Access at: http://localhost:3001

### Building for Production

**Build all packages:**
```bash
npm run build
```

**Build specific packages:**
```bash
npm run build:frontend
npm run build:backoffice
```

## Port Configuration

Each package is configured with a specific port to avoid conflicts:

| Package    | Dev Port | Production Port |
|-----------|----------|-----------------|
| Frontend  | 3000     | 3000            |
| Backoffice| 3001     | 3001            |

Ports are explicitly configured in each package's `package.json`:
- Frontend: `-p 3000` flag in dev and start scripts
- Backoffice: `-p 3001` flag in dev and start scripts

## Adding New Packages

To add a new package to the monorepo:

1. Create a new directory under `packages/`
2. Initialize the package with its own `package.json`
3. The package will automatically be included in the workspace
4. Run `npm install` from the root to link dependencies

## Technology Stack

### Frontend Package
- **Framework**: Next.js 16.1.1
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Linting**: ESLint 9 with Next.js config
- **React**: v19.2.3

### Backoffice Package
- **Framework**: Next.js 16.1.1
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Linting**: ESLint 9 with Next.js config
- **React**: v19.2.3

## Best Practices

### Dependency Management
- Shared dependencies are hoisted to the root `node_modules`
- Package-specific dependencies stay in their respective packages
- Use `npm install <package> -w packages/<workspace>` to add dependencies to specific packages

### Code Organization
- Keep public-facing features in the `frontend` package
- Keep administrative features in the `backoffice` package
- Consider creating shared packages (e.g., `packages/common`) for code reuse

### Environment Variables
- Each package can have its own `.env.local` file
- Root-level environment variables can be shared across packages

### Git Workflow
- The `.gitignore` at the root handles common ignore patterns
- Each package has its own `.gitignore` for package-specific ignores
- Build artifacts (`.next/`, `dist/`) are automatically ignored

## Deployment Considerations

### Independent Deployment
Each package can be deployed separately:
- **Frontend**: Can be deployed to Vercel, Netlify, or any Next.js-compatible host
- **Backoffice**: Can be deployed to the same or different hosting platform

### Shared Deployment
Alternatively, both packages can be deployed together in a monorepo-aware hosting environment.

### Environment-Specific Configuration
- Use environment variables to configure different behaviors per environment
- Consider using different domains/subdomains for frontend and backoffice

## Troubleshooting

### Port Already in Use
If you get a port conflict error:
1. Check if another process is using the port: `lsof -i :3000` or `lsof -i :3001`
2. Kill the process or change the port in the package's `package.json`

### Dependencies Not Found
If you encounter dependency issues:
1. Delete all `node_modules` directories and `package-lock.json`
2. Run `npm install` from the root directory

### Build Failures
If builds fail:
1. Ensure all dependencies are installed: `npm install`
2. Check for TypeScript errors: `npm run lint`
3. Clear Next.js cache: `rm -rf packages/*/. next`
