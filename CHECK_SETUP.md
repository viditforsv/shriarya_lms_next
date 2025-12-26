# Code Quality Checks Setup

This project now has automated checks to catch TypeScript and ESLint errors early.

## Available Scripts

### `npm run check`
Runs both TypeScript type checking and ESLint. Use this before committing.

```bash
npm run check
```

### `npm run type-check`
Runs only TypeScript type checking.

```bash
npm run type-check
```

### `npm run lint`
Runs ESLint on all TypeScript/TSX files in the `src` directory.

```bash
npm run lint
```

### `npm run lint:fix`
Runs ESLint and automatically fixes issues where possible.

```bash
npm run lint:fix
```

### `npm run check:ci`
Runs checks in CI mode (fails on warnings). Use this in CI/CD pipelines.

```bash
npm run check:ci
```

## Pre-commit Hook

A Git pre-commit hook is installed that automatically runs checks before each commit. If checks fail, the commit will be blocked.

### To bypass the hook (not recommended)
```bash
git commit --no-verify
```

### To manually test the hook
```bash
.git/hooks/pre-commit
```

## Workflow

1. **Before committing**: Run `npm run check` to ensure everything passes
2. **If TypeScript errors**: Fix the type errors shown
3. **If ESLint errors**: Run `npm run lint:fix` to auto-fix, then manually fix remaining issues
4. **Commit**: The pre-commit hook will verify everything passes

## CI/CD Integration

For Vercel or other CI/CD platforms, the build process will:
1. Run TypeScript checks during `next build`
2. Run ESLint if configured

To ensure checks run in CI, you can add a build step:
```bash
npm run check:ci && npm run build
```

## Troubleshooting

### Pre-commit hook not running
- Ensure the hook is executable: `chmod +x .git/hooks/pre-commit`
- Check if Git hooks are disabled: `git config core.hooksPath`

### TypeScript errors in CI but not locally
- Ensure you're using the same TypeScript version
- Run `npm run type-check` locally before pushing

### ESLint errors in CI but not locally
- Clear cache: `rm -rf node_modules/.cache`
- Ensure ESLint config is committed to the repo

