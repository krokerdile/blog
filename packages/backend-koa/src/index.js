const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3002;

// Error handling middleware (should be first)
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: 'Internal Server Error',
      message: err.message
    };
    console.error('Error:', err);
  }
});

// Middleware
app.use(bodyParser());

// Routes
router.get('/', async (ctx) => {
  ctx.body = {
    message: 'Welcome to Koa backend',
    framework: 'Koa',
    version: '1.0.0'
  };
});

router.get('/api/health', async (ctx) => {
  ctx.body = {
    status: 'healthy',
    framework: 'Koa',
    timestamp: new Date().toISOString()
  };
});

router.get('/api/posts', async (ctx) => {
  ctx.body = {
    posts: [
      { id: 1, title: 'First Post', content: 'This is the first post' },
      { id: 2, title: 'Second Post', content: 'This is the second post' }
    ]
  };
});

router.post('/api/posts', async (ctx) => {
  const { title, content } = ctx.request.body;
  
  if (!title || !content) {
    ctx.status = 400;
    ctx.body = {
      error: 'Bad Request',
      message: 'Title and content are required'
    };
    return;
  }
  
  ctx.status = 201;
  ctx.body = {
    id: 3,
    title,
    content,
    created: new Date().toISOString()
  };
});

// Apply routes
app.use(router.routes());
app.use(router.allowedMethods());

// 404 handler
app.use(async (ctx) => {
  ctx.status = 404;
  ctx.body = {
    error: 'Not Found',
    path: ctx.path
  };
});

app.listen(PORT, () => {
  console.log(`Koa server is running on http://localhost:${PORT}`);
});

module.exports = app;
