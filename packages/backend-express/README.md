# Express Backend

Express.js backend setup for the hyunu_blog monorepo.

## Features

- RESTful API endpoints
- JSON request/response handling
- Error handling middleware
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

The server will start on `http://localhost:3000` by default.

## API Endpoints

### GET /
Returns a welcome message with framework information.

**Response:**
```json
{
  "message": "Welcome to Express backend",
  "framework": "Express",
  "version": "1.0.0"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "framework": "Express",
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

- `PORT` - Port number for the server (default: 3000)

## Framework

This backend uses [Express.js](https://expressjs.com/), a minimal and flexible Node.js web application framework.
