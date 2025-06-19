module.exports = {
  root: true,
  ignorePatterns: ['node_modules/', '**/dist/**', '**/build/**', '**/*.min.js'],
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': 'warn',
    eqeqeq: 'error',
    curly: 'error',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['**/*.test.{js,ts,jsx,tsx}', '**/*.spec.{js,ts,jsx,tsx}'],
      env: {
        jest: true,
      },
    },
    {
      files: ['**/*.{jsx,tsx}'],
      env: {
        browser: true,
      },
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            varsIgnorePattern: '^React$',
          },
        ],
      },
    },
  ],
};
