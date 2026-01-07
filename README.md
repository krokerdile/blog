# Hyunu Blog

A monorepo for Hyunu Blog containing multiple frontend packages.

## Structure

This project uses npm workspaces to manage multiple packages:

```
hyunu_blog/
├── packages/
│   ├── frontend/          # Main public-facing Next.js application
│   └── backoffice/        # Back-office administrative frontend
├── package.json           # Root workspace configuration
└── README.md
```

## Packages

### Frontend
The main public-facing Next.js application for the blog. Runs on port 3000.

**Location:** `packages/frontend/`

### Backoffice
The administrative dashboard for back-office operations. Runs independently on port 3001.

**Location:** `packages/backoffice/`

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm

### Installation

Install dependencies for all packages:

```bash
npm install
```

### Development

Run both applications:
```bash
npm run dev
```

Run the frontend only:
```bash
npm run dev:frontend
```

Run the back-office only:
```bash
npm run dev:backoffice
```

### Building

Build all packages:
```bash
npm run build
```

Build the frontend only:
```bash
npm run build:frontend
```

Build the back-office only:
```bash
npm run build:backoffice
```

## Architecture

This monorepo structure allows:
- **Independent deployment**: Each package can be deployed separately
- **Shared dependencies**: Common dependencies are hoisted to the root
- **Isolated concerns**: Public frontend and administrative functions are separated
- **Easy development**: Work on both packages simultaneously or independently

## Port Configuration

- **Frontend**: Port 3000 (default Next.js port)
- **Backoffice**: Port 3001 (configured to avoid conflicts)
