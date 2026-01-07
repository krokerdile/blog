# @hyunu/backend

Express.js backend API for Hyunu's blog.

## Features

- RESTful API endpoints
- CORS support
- Express.js with TypeScript
- Hot reload in development with tsx

## Development

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The API will be available at http://localhost:3001

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=3001
NODE_ENV=development
```

## API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `GET /api/posts` - Get blog posts
