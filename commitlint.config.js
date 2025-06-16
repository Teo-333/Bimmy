module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (formatting, missing semi colons, etc)
        'refactor', // Code refactoring
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'chore', // Maintenance tasks, dependencies, tooling
        'ci', // CI/CD changes
        'build', // Changes to build system or external dependencies
        'revert', // Revert a previous commit
        'hotfix', // Critical fixes for production
        'release', // Release preparation
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'frontend', // Frontend-related changes
        'backend', // Backend-related changes
        'api', // API changes
        'ui', // User interface changes
        'auth', // Authentication/authorization
        'db', // Database changes
        'config', // Configuration changes
        'docker', // Docker-related changes
        'docs', // Documentation
        'repo', // Repository-level changes
        'deps', // Dependencies
        'security', // Security-related changes
        'performance', // Performance improvements
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 72],
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [2, 'always'],
  },
};
