const fastify = require('fastify');

const app = fastify({
  logger: true
});

const PORT = process.env.PORT || 3001;

// Routes
app.get('/', async (request, reply) => {
  return {
    message: 'Welcome to Fastify backend',
    framework: 'Fastify',
    version: '1.0.0'
  };
});

app.get('/api/health', async (request, reply) => {
  return {
    status: 'healthy',
    framework: 'Fastify',
    timestamp: new Date().toISOString()
  };
});

app.get('/api/posts', async (request, reply) => {
  return {
    posts: [
      { id: 1, title: 'First Post', content: 'This is the first post' },
      { id: 2, title: 'Second Post', content: 'This is the second post' }
    ]
  };
});

app.post('/api/posts', async (request, reply) => {
  const { title, content } = request.body;
  
  if (!title || !content) {
    reply.code(400);
    return {
      error: 'Bad Request',
      message: 'Title and content are required'
    };
  }
  
  reply.code(201);
  return {
    id: 3,
    title,
    content,
    created: new Date().toISOString()
  };
});

// 404 handler
app.setNotFoundHandler((request, reply) => {
  reply.code(404).send({
    error: 'Not Found',
    path: request.url
  });
});

// Error handler
app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  reply.code(500).send({
    error: 'Internal Server Error',
    message: error.message
  });
});

// Start server
const start = async () => {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Fastify server is running on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

module.exports = app;
