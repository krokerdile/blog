# Koa Backend

Koa backend setup for the hyunu_blog monorepo.

## Features

- RESTful API endpoints with async/await
- Middleware-based architecture
- Context-based request handling
- Lightweight and expressive
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

The server will start on `http://localhost:3002` by default.

## API Endpoints

### GET /
Returns a welcome message with framework information.

**Response:**
```json
{
  "message": "Welcome to Koa backend",
  "framework": "Koa",
  "version": "1.0.0"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "framework": "Koa",
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

- `PORT` - Port number for the server (default: 3002)

## Framework

This backend uses [Koa](https://koajs.com/), a modern web framework designed by the team behind Express.

## Key Features

- **Modern**: Built with ES2015+ features and async functions
- **Lightweight**: Minimal core with no middleware bundled
- **Context**: Combines request and response into a single context object
- **Error Handling**: Elegant error handling with try-catch
- **Cascading Middleware**: More expressive middleware composition
