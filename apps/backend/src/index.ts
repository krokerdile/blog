import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Hyunu Blog API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      posts: '/api/posts',
    },
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Example blog posts endpoint
app.get('/api/posts', (req: Request, res: Response) => {
  const posts = [
    {
      id: 1,
      title: 'Welcome to the Monorepo Blog',
      excerpt: 'Learn how to build a modern blog with monorepo architecture',
      author: 'Hyunu',
      date: '2024-01-07',
    },
    {
      id: 2,
      title: 'Understanding Next.js 16',
      excerpt: 'Deep dive into the latest features of Next.js',
      author: 'Hyunu',
      date: '2024-01-06',
    },
  ];
  res.json({ posts });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});
