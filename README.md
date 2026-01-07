# Hyunu's Blog Monorepo

A modern blog platform built with a monorepo architecture, featuring Next.js frontend and Express backend.

## 📁 Project Structure

```
hyunu_blog/
├── apps/
│   ├── blog/              # Next.js blog frontend
│   └── backend/           # Express.js API backend
├── packages/
│   ├── ui/                # Shared UI components library
│   ├── tsconfig/          # Shared TypeScript configurations
│   └── config/            # Shared ESLint and Prettier configs
├── pnpm-workspace.yaml    # pnpm workspace configuration
├── turbo.json            # Turbo build configuration
└── package.json          # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run specific app
pnpm --filter @hyunu/blog dev
pnpm --filter @hyunu/backend dev
```

### Building

```bash
# Build all apps
pnpm build

# Build specific app
pnpm --filter @hyunu/blog build
```

### Linting

```bash
# Lint all packages
pnpm lint

# Format all files
pnpm format
```

## 📦 Packages

### @hyunu/blog
Next.js-based blog frontend with:
- Modern UI using Tailwind CSS
- Shared components from @hyunu/ui
- TypeScript support
- Server-side rendering

### @hyunu/backend
Express.js backend API with:
- RESTful API endpoints
- CORS support
- Environment configuration
- TypeScript support

### @hyunu/ui
Shared UI components library:
- Button component
- Card component
- Fully typed with TypeScript
- Reusable across all apps

### @hyunu/tsconfig
Centralized TypeScript configurations:
- Base configuration
- Next.js specific config
- Node.js specific config
- React library config

### @hyunu/config
Shared tooling configurations:
- ESLint configurations
- Prettier configuration

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Express.js, TypeScript
- **Build System**: Turbo, pnpm workspaces
- **Language**: TypeScript
- **Styling**: Tailwind CSS

## 📝 Adding New Packages

1. Create a new directory in `packages/` or `apps/`
2. Add a `package.json` with the name `@hyunu/<package-name>`
3. Configure `tsconfig.json` extending from `@hyunu/tsconfig`
4. Run `pnpm install` to link the workspace

## 🔧 Scripts

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps
- `pnpm lint` - Lint all packages
- `pnpm format` - Format all files
- `pnpm clean` - Clean all build artifacts

## 📄 License

MIT

## 👤 Author

Hyunu