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
├── turbo.json            # Turbo build configuration
└── package.json          # Root package.json with workspaces
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Yarn >= 1.22.0

### Installation

```bash
# Install Yarn if you haven't already
npm install -g yarn

# Install dependencies
yarn install
```

### Development

```bash
# Run all apps in development mode
yarn dev

# Run specific app
yarn workspace @hyunu/blog dev
yarn workspace @hyunu/backend dev
```

### Building

```bash
# Build all apps
yarn build

# Build specific app
yarn workspace @hyunu/blog build
```

### Linting

```bash
# Lint all packages
yarn lint

# Format all files
yarn format
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
- **Build System**: Turbo, Yarn workspaces
- **Language**: TypeScript
- **Styling**: Tailwind CSS

## 📝 Adding New Packages

1. Create a new directory in `packages/` or `apps/`
2. Add a `package.json` with the name `@hyunu/<package-name>`
3. Configure `tsconfig.json` extending from `@hyunu/tsconfig`
4. Run `yarn install` to link the workspace

## 🔧 Scripts

- `yarn dev` - Start all apps in development mode
- `yarn build` - Build all apps
- `yarn lint` - Lint all packages
- `yarn format` - Format all files
- `yarn clean` - Clean all build artifacts

## 📄 License

MIT

## 👤 Author

Hyunu