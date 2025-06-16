# Contributing to Bimmy (BeamMP Server Management Platform)

We ❤️ contributions from the community! By participating in this project, you agree to abide by our
[Code of Conduct](CODE_OF_CONDUCT.md).

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Branch Naming Strategy](#branch-naming-strategy)
- [Code Quality Standards](#code-quality-standards)
- [Pull Requests](#pull-requests)
- [Testing Requirements](#testing-requirements)
- [Development Setup](#development-setup)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

- **Node.js** (>=16.0.0)
- **npm** (>=7.0.0) or **yarn** (>=1.22.0)
- **Git** (>=2.28.0)

### Quick Setup

1. **Fork and Clone the Repository**

   ```bash
   # Fork the repository on GitHub, then clone your fork
   git clone https://github.com/<your-username>/Bimmy.git
   cd Bimmy
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # This will automatically set up Husky hooks via the 'prepare' script
   ```

3. **Verify Setup**
   ```bash
   # Check if pre-commit hooks are working
   npm run lint:check
   npm run format:check
   ```

---

## Development Workflow

### Branch Strategy

We follow **Git Flow** with the following branch structure:

#### Core Branches

- **`main`** - Production-ready code, tagged releases only
- **`develop`** - Integration branch for ongoing development

#### Supporting Branches

- **`feature/<scope>/<description>`** - New features and enhancements
- **`hotfix/<description>`** - Critical fixes for production issues
- **`release/<version>`** - Release preparation and finalization
- **`bugfix/<scope>/<description>`** - Bug fixes for develop branch

#### Branch Naming Examples

```bash
feature/frontend/user-authentication
feature/backend/api-rate-limiting
hotfix/security-vulnerability-fix
release/v1.2.0
bugfix/ui/login-form-validation
```

### Working with Branches

```bash
# Start a new feature
git checkout develop
git pull origin develop
git checkout -b feature/frontend/dashboard-redesign

# Work on your feature...
git add .
git commit -m "feat(frontend): implement responsive dashboard layout"

# Push and create PR
git push -u origin feature/frontend/dashboard-redesign
```

---

## Commit Message Guidelines

We use **[Conventional Commits](https://www.conventionalcommits.org/)** to ensure consistent,
semantic commit messages that enable automated versioning and changelog generation.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

| Type       | Description                        | Example                                               |
| ---------- | ---------------------------------- | ----------------------------------------------------- |
| `feat`     | New feature                        | `feat(auth): add OAuth2 integration`                  |
| `fix`      | Bug fix                            | `fix(api): resolve memory leak in user sessions`      |
| `docs`     | Documentation changes              | `docs(readme): update installation instructions`      |
| `style`    | Code formatting (no logic changes) | `style(frontend): fix ESLint formatting issues`       |
| `refactor` | Code refactoring                   | `refactor(backend): extract user service logic`       |
| `perf`     | Performance improvements           | `perf(db): optimize user query performance`           |
| `test`     | Adding/updating tests              | `test(api): add integration tests for auth endpoints` |
| `chore`    | Maintenance tasks                  | `chore(deps): update dependencies to latest versions` |
| `ci`       | CI/CD changes                      | `ci(github): add automated deployment workflow`       |
| `build`    | Build system changes               | `build(docker): optimize container build process`     |
| `revert`   | Revert previous commit             | `revert: revert feat(auth): add OAuth2 integration`   |
| `hotfix`   | Critical production fixes          | `hotfix(security): patch XSS vulnerability`           |
| `release`  | Release preparation                | `release(v1.2.0): bump version and update changelog`  |

### Allowed Scopes

| Scope         | Description                  |
| ------------- | ---------------------------- |
| `frontend`    | Frontend-related changes     |
| `backend`     | Backend-related changes      |
| `api`         | API changes                  |
| `ui`          | User interface changes       |
| `auth`        | Authentication/authorization |
| `db`          | Database changes             |
| `config`      | Configuration changes        |
| `docker`      | Docker-related changes       |
| `docs`        | Documentation                |
| `repo`        | Repository-level changes     |
| `deps`        | Dependencies                 |
| `security`    | Security-related changes     |
| `performance` | Performance improvements     |

### Commit Message Rules

- **Subject line**: Max 72 characters, lowercase, no period
- **Body**: Wrap at 100 characters, explain "what" and "why"
- **Footer**: Reference issues, breaking changes, etc.

### Examples

#### Simple Feature

```
feat(frontend): add user profile dropdown menu
```

#### Bug Fix with Body

```
fix(api): resolve race condition in user authentication

The authentication middleware was not properly handling concurrent
requests, causing intermittent 401 errors for valid users.

Fixes #123
```

#### Breaking Change

```
feat(api)!: redesign user authentication endpoints

BREAKING CHANGE: The /auth endpoint now requires a different request
format. See migration guide for details.

Closes #456
```

### Assisted Commits

Use Commitizen for guided commit message creation:

```bash
# Instead of 'git commit', use:
npm run commit
```

---

## Code Quality Standards

### Automated Quality Checks

Our pre-commit hooks automatically run:

1. **ESLint** - Code quality and consistency
2. **Prettier** - Code formatting
3. **TypeScript** - Type checking
4. **Commitlint** - Commit message validation

### Manual Quality Commands

```bash
# Lint and fix issues
npm run lint

# Check formatting
npm run format:check

# Apply formatting
npm run format

# Type checking
npm run type-check

# Run all checks
npm run pre-commit
```

### Code Style Guidelines

- **Indentation**: 2 spaces (no tabs)
- **Quotes**: Single quotes for strings
- **Semicolons**: Always required
- **Line Length**: 80 characters (100 for comments)
- **File Naming**:
  - Components: `PascalCase.tsx`
  - Utilities: `camelCase.ts`
  - Constants: `UPPER_SNAKE_CASE.ts`

### Pre-commit Hook Bypass

⚠️ **Not Recommended** - Only for emergency situations:

```bash
git commit --no-verify -m "emergency: critical production fix"
```

---

## Branch Naming Strategy

### Format

```
<type>/<scope>/<short-description>
```

### Guidelines

- Use **kebab-case** for descriptions
- Keep branch names under 50 characters
- Be descriptive but concise
- Include ticket numbers when applicable

### Examples

```bash
feature/frontend/user-dashboard-redesign
feature/backend/api-rate-limiting-v2
bugfix/ui/modal-overlay-z-index
hotfix/security-patch-jwt-validation
release/v1.3.0
chore/deps/update-react-version
docs/api/add-authentication-examples
```

---

## Pull Requests

### PR Checklist

Before submitting a pull request, ensure:

- [ ] **Branch** is up to date with target branch (`develop` or `main`)
- [ ] **Commits** follow Conventional Commit format
- [ ] **Tests** pass locally (`npm test`)
- [ ] **Linting** passes (`npm run lint:check`)
- [ ] **Formatting** is correct (`npm run format:check`)
- [ ] **Documentation** is updated (if applicable)
- [ ] **Breaking changes** are documented
- [ ] **PR description** follows template

### PR Title Format

PR titles should follow the same format as commit messages:

```
feat(frontend): implement user authentication flow
```

### PR Description Template

```markdown
## Description

Brief description of changes and motivation.

## Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that causes existing functionality to not work as expected)
- [ ] Documentation update

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)

Add screenshots or GIFs for UI changes.

## Related Issues

Closes #123 Refs #456
```

---

## Testing Requirements

### Test Coverage Expectations

- **Unit Tests**: Minimum 80% coverage for new code
- **Integration Tests**: Critical user flows must be covered
- **E2E Tests**: Major features require end-to-end coverage

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test suite
npm test -- --testNamePattern="user authentication"
```

---

## Development Setup

### Environment Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Initialize Git hooks**:
   ```bash
   npm run prepare
   ```

### IDE Configuration

#### VS Code (Recommended)

Install recommended extensions:

- ESLint
- Prettier
- GitLens
- Conventional Commits

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "conventionalCommits.scopes": [
    "frontend",
    "backend",
    "api",
    "ui",
    "auth",
    "db",
    "config",
    "docker",
    "docs",
    "repo",
    "deps",
    "security",
    "performance"
  ]
}
```

---

## Troubleshooting

### Common Issues

#### Husky Hooks Not Working

```bash
# Reinstall hooks
npm run prepare
# or
npx husky install
```

#### Commitlint Failures

```bash
# Check commit message format
npx commitlint --from HEAD~1 --to HEAD --verbose

# Use assisted commit
npm run commit
```

#### ESLint/Prettier Conflicts

```bash
# Fix automatically
npm run lint
npm run format
```

#### Pre-commit Hook Bypass (Emergency Only)

```bash
git commit --no-verify -m "emergency: bypass hooks for critical fix"
```

### Getting Help

- **Documentation**: Check the `/docs` folder
- **Issues**: Search [existing issues](https://github.com/Teo-333/Bimmy/issues)
- **Discussions**: Use [GitHub Discussions](https://github.com/Teo-333/Bimmy/discussions)
- **Code Review**: Tag maintainers in your PR

---

## Enforcement

These standards are enforced through:

- **Pre-commit hooks** (Husky + lint-staged)
- **CI/CD pipeline** (GitHub Actions)
- **Code review process** (Required for all PRs)
- **Automated quality gates** (Branch protection rules)

### Violation Consequences

- **Commit message violations**: Commit will be rejected
- **Code quality violations**: PR will be blocked
- **Repeated violations**: Additional training/mentoring

---

## Additional Resources

- **[Conventional Commits Specification](https://www.conventionalcommits.org/)**
- **[Git Flow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)**
- **[Semantic Versioning](https://semver.org/)**
- **[Contributing Best Practices](https://opensource.guide/how-to-contribute/)**

---

**Thank you for contributing to Bimmy! 🚗💨**

_For questions about these guidelines, please open a discussion or contact the maintainers._
