# @hyunu/blog

Next.js blog frontend application.

## Features

- Server-side rendering with Next.js 16
- Tailwind CSS for styling
- Shared UI components from @hyunu/ui
- TypeScript support
- Hot module replacement in development

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The app will be available at http://localhost:3000

## Structure

- `/app` - Next.js App Router pages
- `/public` - Static assets

## Temporary Admin

- URL: `/admin`
- Login uses build-time env variables:
  - `NEXT_PUBLIC_ADMIN_USERNAME`
  - `NEXT_PUBLIC_ADMIN_PASSWORD_SHA256`
- For GitHub Pages workflow, set repository secrets:
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD_SHA256`
- SHA-256 example:

```bash
printf "your-password" | shasum -a 256
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
