# Contributing to Hyunu Blog

Thank you for your interest in contributing to the Hyunu Blog monorepo!

## Project Structure

```
hyunu_blog/
├── apps/              # Applications
│   ├── blog/         # Next.js blog frontend
│   └── backend/      # Express.js API backend
└── packages/         # Shared packages
    ├── ui/           # UI components
    ├── tsconfig/     # TypeScript configs
    └── config/       # Linting configs
```

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/hyunu_blog.git
   cd hyunu_blog
   ```

2. **Install Dependencies**
   ```bash
   npm install -g pnpm
   pnpm install
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Making Changes

### Code Style

- We use Prettier for formatting
- We use ESLint for linting
- Run `pnpm format` before committing
- Run `pnpm lint` to check for issues

### Commit Messages

Follow conventional commit format:

```
feat: add new blog post component
fix: resolve navigation bug
docs: update README
style: format code
refactor: restructure API routes
test: add unit tests for Button
chore: update dependencies
```

### Testing Your Changes

```bash
# Build all packages
pnpm build

# Test in development mode
pnpm dev
```

## Submitting Changes

1. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

2. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Describe your changes

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Include tests if applicable
- Update documentation as needed
- Ensure all builds pass
- Follow the existing code style

## Package Guidelines

### Adding a New Package

1. Create the package directory structure
2. Add `package.json` with `@hyunu/` scope
3. Configure TypeScript with shared configs
4. Add README.md with usage examples
5. Update root README.md if necessary

### Modifying Existing Packages

1. Test changes locally first
2. Update version in package.json if publishing
3. Update documentation
4. Ensure backward compatibility when possible

## Questions?

Feel free to open an issue for any questions or concerns.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
