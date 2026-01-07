# Hyunu's Blog Monorepo

A modern blog platform built with a monorepo architecture, featuring Next.js frontend, Express backend, and additional backend framework options (Fastify and Koa) for testing and comparison.

## 📁 Project Structure

```
hyunu_blog/
├── apps/
│   ├── blog/              # Next.js blog frontend
│   └── backend/           # Express.js API backend (TypeScript)
├── packages/
│   ├── backend-express/   # Express.js backend (JavaScript)
│   ├── backend-fastify/   # Fastify backend (JavaScript)
│   ├── backend-koa/       # Koa backend (JavaScript)
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

## 🔌 Backend Framework Options

This monorepo includes multiple backend framework setups for testing and comparison:

### Primary Backend: @hyunu/backend (apps/backend)
TypeScript-based Express.js backend with:
- RESTful API endpoints
- CORS support
- Environment configuration
- Integrated with the monorepo build system

### Alternative Backends for Testing (packages/)

#### 1. Express (Port 3000) - packages/backend-express
Standalone Express.js backend for framework comparison:
- Location: `packages/backend-express`
- Default Port: 3000
- [Express Documentation](https://expressjs.com/)

```bash
npm run start:express
# or
cd packages/backend-express && npm install && npm start
```

#### 2. Fastify (Port 3001) - packages/backend-fastify
Fast and low overhead web framework:
- Location: `packages/backend-fastify`
- Default Port: 3001
- Built-in logging with Pino
- [Fastify Documentation](https://www.fastify.io/)

```bash
npm run start:fastify
# or
cd packages/backend-fastify && npm install && npm start
```

#### 3. Koa (Port 3002) - packages/backend-koa
Modern web framework with async/await support:
- Location: `packages/backend-koa`
- Default Port: 3002
- Context-based routing
- [Koa Documentation](https://koajs.com/)

```bash
npm run start:koa
# or
cd packages/backend-koa && npm install && npm start
```

### Backend Framework Comparison

All alternative backends (Express, Fastify, Koa) implement the same REST API for easy comparison:

- `GET /` - Welcome message with framework information
- `GET /api/health` - Health check endpoint
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post (with validation)

Test the APIs using curl:

```bash
# Test Express (port 3000)
curl http://localhost:3000/api/health

# Test Fastify (port 3001)
curl http://localhost:3001/api/health

# Test Koa (port 3002)
curl http://localhost:3002/api/health
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
- **Alternative Backends**: Express.js, Fastify, Koa (JavaScript)
- **Build System**: Turbo, Yarn workspaces
- **Language**: TypeScript, JavaScript
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
- `yarn start:express` - Start Express backend (port 3000)
- `yarn start:fastify` - Start Fastify backend (port 3001)
- `yarn start:koa` - Start Koa backend (port 3002)

## 📄 License

MIT

## 👤 Author

Hyunu
