# Architecture Overview

## Monorepo Structure

The Hyunu Blog project uses a monorepo architecture managed with yarn workspaces and Turbo for efficient builds.

```
┌─────────────────────────────────────────────────────────┐
│                    Hyunu Blog Monorepo                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────┐  ┌──────────────────────┐   │
│  │       Apps           │  │      Packages        │   │
│  │                      │  │                      │   │
│  │  ┌───────────────┐   │  │  ┌──────────────┐  │   │
│  │  │  @hyunu/blog  │   │  │  │  @hyunu/ui   │  │   │
│  │  │   (Next.js)   │───┼──┼─▶│ (Components) │  │   │
│  │  └───────────────┘   │  │  └──────────────┘  │   │
│  │                      │  │                      │   │
│  │  ┌───────────────┐   │  │  ┌──────────────┐  │   │
│  │  │@hyunu/backend │   │  │  │@hyunu/config │  │   │
│  │  │  (Express)    │───┼──┼─▶│  (Configs)   │  │   │
│  │  └───────────────┘   │  │  └──────────────┘  │   │
│  │                      │  │                      │   │
│  │                      │  │  ┌──────────────┐  │   │
│  │                      │  │  │@hyunu/tsconfig│ │   │
│  │                      │  │  │  (TS Configs) │ │   │
│  │                      │  │  └──────────────┘  │   │
│  └──────────────────────┘  └──────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend (@hyunu/blog)
- **Framework**: Next.js 16
- **Rendering**: Server-side Rendering (SSR) + Static Generation
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **UI Components**: @hyunu/ui package

### Backend (@hyunu/backend)
- **Framework**: Express.js
- **Language**: TypeScript 5
- **Runtime**: Node.js 18+
- **API Style**: RESTful

### Shared Packages

#### @hyunu/ui
- **Purpose**: Shared React components
- **Components**: Button, Card (extensible)
- **Styling**: Tailwind CSS utilities
- **Build**: tsup for ESM/CJS dual build

#### @hyunu/tsconfig
- **Purpose**: Centralized TypeScript configurations
- **Configs**: base, nextjs, node, react
- **Benefits**: Consistency across all packages

#### @hyunu/config
- **Purpose**: Shared tooling configurations
- **Tools**: ESLint, Prettier
- **Benefits**: Unified code style

## Build System

### yarn Workspaces
- Efficient dependency management
- Workspace protocol for internal packages
- Single lock file for entire monorepo

### Turbo
- Intelligent build caching
- Parallel task execution
- Pipeline orchestration
- Remote caching support (optional)

## Data Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ HTTP Request
       ▼
┌─────────────────┐
│  Next.js Blog   │
│   Port: 3000    │
└────────┬────────┘
         │
         │ API Calls
         ▼
┌─────────────────┐
│ Express Backend │
│   Port: 3001    │
└────────┬────────┘
         │
         │ Future: Database
         ▼
┌─────────────────┐
│   Data Store    │
│  (To be added)  │
└─────────────────┘
```

## Package Dependencies

```
┌──────────────┐
│@hyunu/tsconfig│ (no dependencies)
└───────┬──────┘
        │
        ▼
┌──────────────┐     ┌──────────────┐
│ @hyunu/config│     │  @hyunu/ui   │
└───────┬──────┘     └───────┬──────┘
        │                    │
        └────────┬───────────┘
                 │
                 ▼
        ┌────────────────┐
        │  Applications  │
        │ (blog, backend)│
        └────────────────┘
```

## Development Workflow

1. **Install**: `yarn install` - Install all dependencies
2. **Develop**: `yarn dev` - Start all apps in watch mode
3. **Build**: `yarn build` - Build all packages and apps
4. **Lint**: `yarn lint` - Check code quality
5. **Format**: `yarn format` - Format code

## Deployment Strategy

### Blog (Frontend)
- **Platform**: Vercel (recommended) / Netlify / any static host
- **Build Command**: `yarn build --filter @hyunu/blog`
- **Output Directory**: `apps/blog/.next`
- **Environment**: Edge/Node.js runtime

### Backend (API)
- **Platform**: Railway / Render / AWS / Docker
- **Build Command**: `yarn build --filter @hyunu/backend`
- **Start Command**: `node apps/backend/dist/index.js`
- **Port**: 3001 (configurable via ENV)

### Deployment Flow
```
┌──────────────┐
│  Git Push    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  CI/CD       │ (GitHub Actions, etc.)
│  - Install   │
│  - Build     │
│  - Test      │
└──────┬───────┘
       │
       ├─────────────────┬─────────────────┐
       ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Vercel     │  │   Railway    │  │    Docker    │
│   (Blog)     │  │  (Backend)   │  │   Registry   │
└──────────────┘  └──────────────┘  └──────────────┘
```

## Scalability

### Current Architecture
- Monolithic backend
- SSR frontend
- Shared component library

### Future Enhancements
- Database integration (PostgreSQL, MongoDB)
- Authentication service
- CMS integration
- CDN for static assets
- Microservices architecture
- GraphQL API layer
- Real-time features (WebSocket)
- Admin dashboard
- Analytics integration

## Security Considerations

- TypeScript for type safety
- ESLint for code quality
- CORS configuration in backend
- Environment variables for secrets
- Input validation (to be added)
- Rate limiting (to be added)
- Authentication (to be added)

## Performance Optimizations

- Turbo cache for faster builds
- Next.js automatic code splitting
- Server-side rendering for initial load
- Static generation where possible
- Tree shaking with modern bundlers
- yarn for efficient installs

## Testing Strategy (Future)

- Unit tests: Jest + React Testing Library
- E2E tests: Playwright
- Integration tests: Supertest for API
- Type checking: TypeScript
- Linting: ESLint
- Formatting: Prettier

## Monitoring (Future)

- Error tracking: Sentry
- Analytics: Vercel Analytics
- Logging: Winston/Pino
- Performance: Lighthouse CI
