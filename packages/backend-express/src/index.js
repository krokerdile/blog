const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Express backend',
    framework: 'Express',
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    framework: 'Express',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/posts', (req, res) => {
  res.json({
    posts: [
      { id: 1, title: 'First Post', content: 'This is the first post' },
      { id: 2, title: 'Second Post', content: 'This is the second post' }
    ]
  });
});

app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Title and content are required'
    });
  }
  
  res.status(201).json({
    id: 3,
    title,
    content,
    created: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});

module.exports = app;
