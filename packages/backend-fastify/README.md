# Fastify Backend

Fastify backend setup for the hyunu_blog monorepo.

## Features

- RESTful API endpoints with async/await
- Built-in logging
- JSON schema validation support
- Fast and low overhead
- Health check endpoint
- Sample CRUD operations

## Installation

```bash
npm install
```

## Usage

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3001` by default.

## API Endpoints

### GET /
Returns a welcome message with framework information.

**Response:**
```json
{
  "message": "Welcome to Fastify backend",
  "framework": "Fastify",
  "version": "1.0.0"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "framework": "Fastify",
  "timestamp": "2026-01-07T05:19:39.085Z"
}
```

### GET /api/posts
Get all posts.

**Response:**
```json
{
  "posts": [
    { "id": 1, "title": "First Post", "content": "This is the first post" },
    { "id": 2, "title": "Second Post", "content": "This is the second post" }
  ]
}
```

### POST /api/posts
Create a new post.

**Request Body:**
```json
{
  "title": "New Post",
  "content": "Post content"
}
```

**Response:**
```json
{
  "id": 3,
  "title": "New Post",
  "content": "Post content",
  "created": "2026-01-07T05:19:39.085Z"
}
```

## Environment Variables

- `PORT` - Port number for the server (default: 3001)

## Framework

This backend uses [Fastify](https://www.fastify.io/), a fast and low overhead web framework for Node.js.

## Key Features

- **Performance**: One of the fastest web frameworks available
- **Async/Await**: Full support for modern JavaScript async patterns
- **Schema Validation**: Built-in JSON schema validation
- **Logging**: Integrated logging with Pino
- **Plugin System**: Extensible architecture with plugins
