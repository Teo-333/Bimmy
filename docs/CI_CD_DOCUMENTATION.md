# CI/CD Documentation for Bimmy

This document explains the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the
Bimmy project.

## Overview

The Bimmy project uses GitHub Actions for automated testing, code quality checks, and deployment
processes. The CI/CD pipeline is designed to ensure code quality, security, and consistency across
the monorepo structure.

## Monorepo Structure

```
Bimmy/
├── src/
│   ├── frontend/           # React TypeScript frontend application
│   │   ├── package.json    # Frontend-specific dependencies
│   │   └── tsconfig.json   # Frontend TypeScript configuration
│   ├── backend/            # NestJS TypeScript backend application
│   │   ├── package.json    # Backend-specific dependencies
│   │   └── tsconfig.json   # Backend TypeScript configuration
│   └── __tests__/          # Shared test files
├── package.json            # Root package.json with workspace scripts
├── tsconfig.json           # Root TypeScript configuration
└── .github/workflows/      # GitHub Actions workflows
```

## Workflows

### 1. Code Quality & Standards (`code-quality.yml`)

This workflow runs on every push to `main` or `develop` branches and on all pull requests targeting
these branches.

#### Jobs:

#### **lint-commits**

- **Purpose**: Validates commit messages follow conventional commit standards
- **When**: Runs on pushes and pull requests
- **What it does**:
  - Checks out the repository with full git history
  - Sets up Node.js 18 environment
  - Installs dependencies
  - Runs `commitlint` to validate commit message format
- **Expected format**: `type(scope): description`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
  - Example: `feat(auth): add user login functionality`

#### **code-quality**

- **Purpose**: Performs comprehensive code quality checks
- **What it does**:
  1. **Dependency Installation**: Installs root, frontend, and backend dependencies
  2. **ESLint Check**: Runs `npm run lint:check` to verify code follows linting rules
  3. **Prettier Check**: Runs `npm run format:check` to verify code formatting
  4. **TypeScript Check**: Runs `npm run type-check` to verify type safety
  5. **Tests**: Runs `npm test` to execute all test suites

#### **branch-naming**

- **Purpose**: Validates branch names follow the project's naming convention
- **When**: Only runs on pull requests
- **Expected format**: `<type>/<description>`
  - Types: `feature`, `bugfix`, `hotfix`, `release`, `chore`, `docs`
  - Description: alphanumeric characters and hyphens only
  - Examples:
    - ✅ `feature/user-authentication`
    - ✅ `bugfix/login-error`
    - ✅ `chore/update-dependencies`
    - ❌ `feature/user_authentication` (underscores not allowed)
    - ❌ `new-feature` (missing type prefix)

#### **security-scan**

- **Purpose**: Scans for security vulnerabilities in dependencies
- **What it does**:
  1. **NPM Audit**: Runs `npm audit` to check for known vulnerabilities
  2. **Audit CI**: Uses `audit-ci` tool with project-specific configuration
  3. **Continues on error**: Security scan failures don't block the pipeline (set to
     `continue-on-error: true`)

## Scripts Reference

### Root Level Scripts

| Script                | Command                                  | Purpose                                          |
| --------------------- | ---------------------------------------- | ------------------------------------------------ |
| `type-check`          | Composite command                        | Runs type checking for all parts of the monorepo |
| `type-check:root`     | `tsc --noEmit --project .`               | Type checks root-level TypeScript files          |
| `type-check:frontend` | `cd src/frontend && npx tsc --noEmit`    | Type checks frontend code                        |
| `type-check:backend`  | `cd src/backend && npx tsc --noEmit`     | Type checks backend code                         |
| `lint:check`          | `eslint . --ext .js,.jsx,.ts,.tsx`       | Checks linting rules without fixing              |
| `lint`                | `eslint . --ext .js,.jsx,.ts,.tsx --fix` | Checks and auto-fixes linting issues             |
| `format:check`        | `prettier --check .`                     | Checks code formatting                           |
| `format`              | `prettier --write .`                     | Auto-formats code                                |
| `test`                | `jest`                                   | Runs all tests                                   |
| `test:watch`          | `jest --watch`                           | Runs tests in watch mode                         |
| `test:coverage`       | `jest --coverage`                        | Runs tests with coverage report                  |

## TypeScript Configuration

### Root Configuration (`tsconfig.json`)

- Handles root-level files and configuration
- Excludes frontend and backend directories
- Uses project references for monorepo support

### Frontend Configuration (`src/frontend/tsconfig.json`)

- Configured for React with Create React App
- Includes SVG module declarations in `react-app-env.d.ts`
- Uses `jsx: "react-jsx"` for modern React JSX transform

### Backend Configuration (`src/backend/tsconfig.json`)

- Configured for NestJS with Node.js target
- Uses CommonJS modules for backend compatibility
- Includes decorator support for NestJS

## Troubleshooting Common Issues

### TypeScript Errors

#### "Cannot find module './logo.svg'"

- **Cause**: Missing SVG type declarations
- **Solution**: SVG types are declared in `src/frontend/src/react-app-env.d.ts`
- **Check**: Ensure the file includes the SVG module declaration

#### "JSX element implicitly has type 'any'"

- **Cause**: React types not properly configured
- **Solution**: Ensure `@types/react` and `@types/react-dom` are installed in frontend
- **Check**: Run `cd src/frontend && npm install`

#### "Cannot find module 'react'"

- **Cause**: React types missing or TypeScript config pointing to wrong location
- **Solution**: Install dependencies and check TypeScript configuration
- **Fix**: Run individual type checks to isolate the issue

### Branch Naming Issues

#### Branch name validation fails

- **Cause**: Branch name doesn't follow the required pattern
- **Solution**: Rename your branch to follow the pattern `<type>/<description>`
- **Types allowed**: `feature`, `bugfix`, `hotfix`, `release`, `chore`, `docs`
- **Example**: `git checkout -b feature/user-authentication`

### Commit Message Issues

#### Commitlint fails

- **Cause**: Commit message doesn't follow conventional commit format
- **Solution**: Use the format `type(scope): description`
- **Examples**:
  - `feat: add user authentication`
  - `fix(auth): resolve login error`
  - `docs: update API documentation`
  - `chore: update dependencies`

### Dependency Issues

#### NPM install fails in CI

- **Cause**: Dependency conflicts or missing lock files
- **Solution**:
  1. Delete `node_modules` and lock files
  2. Run `npm install` in root, frontend, and backend
  3. Commit updated lock files

#### Different Node versions

- **Cause**: Local Node version differs from CI (18.x)
- **Solution**: Use Node 18.x locally or use nvm/nvs to switch versions

## Security Considerations

### Audit CI Configuration

- Configuration file: `audit-ci.json`
- Scans for known vulnerabilities in dependencies
- Can be configured to allow certain vulnerability levels
- Runs with `continue-on-error: true` to not block deployments

### Dependencies

- Frontend and backend have separate `package.json` files
- Root `package.json` contains shared development dependencies
- Regular security updates should be performed

## Development Workflow

### Before Creating a PR:

1. **Branch naming**: Ensure your branch follows the naming convention
2. **Commit messages**: Use conventional commit format
3. **Local checks**: Run these commands locally:
   ```bash
   npm run lint:check
   npm run format:check
   npm run type-check
   npm test
   ```
4. **Dependencies**: Ensure all dependencies are installed and up to date

### If CI Fails:

1. **Check the specific job that failed**
2. **Review the error messages in the GitHub Actions logs**
3. **Run the failing command locally to reproduce the issue**
4. **Fix the issue and push updates**

## Maintenance

### Regular Tasks:

- Update Node.js version in workflows when LTS changes
- Update GitHub Actions to latest versions
- Review and update security scan configurations
- Monitor for new ESLint and Prettier rule updates

### Adding New Checks:

1. Add new scripts to root `package.json`
2. Update the `code-quality` job in `.github/workflows/code-quality.yml`
3. Test locally before pushing
4. Document the new check in this file

## Contact

For issues with the CI/CD pipeline, please:

1. Check this documentation first
2. Review the GitHub Actions logs for specific error messages
3. Create an issue with the `ci/cd` label
4. Include relevant error messages and steps to reproduce
