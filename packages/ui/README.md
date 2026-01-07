# @hyunu/ui

Shared UI components library for Hyunu's blog monorepo.

## Components

### Button

A flexible button component with multiple variants and sizes.

```tsx
import { Button } from '@hyunu/ui';

<Button variant="primary" size="md">
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'

### Card

A card container component with optional title and footer.

```tsx
import { Card } from '@hyunu/ui';

<Card 
  title="Card Title"
  footer={<Button>Action</Button>}
>
  Card content goes here
</Card>
```

**Props:**
- `title`: string (optional)
- `footer`: ReactNode (optional)

## Development

```bash
# Build the package
pnpm build

# Watch mode for development
pnpm dev
```
