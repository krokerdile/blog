# hyunu_blog

A monorepo featuring multiple backend framework setups for testing and development.

## Structure

This monorepo contains three backend implementations using different Node.js frameworks:

```
hyunu_blog/
├── packages/
│   ├── backend-express/    # Express.js backend
│   ├── backend-fastify/    # Fastify backend
│   └── backend-koa/        # Koa backend
└── package.json
```

## Backend Frameworks

### 1. Express (Port 3000)
Express.js - Fast, unopinionated, minimalist web framework for Node.js.
- Location: `packages/backend-express`
- Default Port: 3000
- [Express Documentation](https://expressjs.com/)

### 2. Fastify (Port 3001)
Fastify - Fast and low overhead web framework, highly focused on performance.
- Location: `packages/backend-fastify`
- Default Port: 3001
- [Fastify Documentation](https://www.fastify.io/)

### 3. Koa (Port 3002)
Koa - Modern web framework designed by the team behind Express, with async/await support.
- Location: `packages/backend-koa`
- Default Port: 3002
- [Koa Documentation](https://koajs.com/)

## Quick Start

### Install Dependencies

From the root directory (npm workspaces will handle all packages):

```bash
npm install
```

Or install individually in each package if needed:

```bash
cd packages/backend-express && npm install
cd packages/backend-fastify && npm install
cd packages/backend-koa && npm install
```

### Running the Servers

Start each backend individually:

```bash
# Express backend
npm run start:express

# Fastify backend
npm run start:fastify

# Koa backend
npm run start:koa
```

Or start from within each package directory:

```bash
cd packages/backend-express && npm start
cd packages/backend-fastify && npm start
cd packages/backend-koa && npm start
```

## API Endpoints

All three backends implement the same API endpoints for easy comparison:

- `GET /` - Welcome message with framework information
- `GET /api/health` - Health check endpoint
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post

## Testing the APIs

You can test the APIs using curl:

```bash
# Test Express (port 3000)
curl http://localhost:3000/
curl http://localhost:3000/api/health
curl http://localhost:3000/api/posts

# Test Fastify (port 3001)
curl http://localhost:3001/
curl http://localhost:3001/api/health
curl http://localhost:3001/api/posts

# Test Koa (port 3002)
curl http://localhost:3002/
curl http://localhost:3002/api/health
curl http://localhost:3002/api/posts
```

## Environment Variables

Each backend can be configured with environment variables:

- `PORT` - Override the default port number

Example:
```bash
PORT=4000 npm run start:express
```

## Development

Each backend package contains:
- `package.json` - Dependencies and scripts
- `src/index.js` - Main server file
- `README.md` - Framework-specific documentation

## Features

- ✅ Three different backend frameworks in one monorepo
- ✅ Consistent API across all frameworks
- ✅ Easy to compare performance and development experience
- ✅ Individual package management
- ✅ Simple deployment options

## License

MIT