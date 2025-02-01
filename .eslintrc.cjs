const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

const extensions = [
  '@vercel/style-guide/eslint/node',
  '@vercel/style-guide/eslint/typescript',
].map(require.resolve);

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: extensions,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ['dist/*', 'node_modules/*'],
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': [
      'off',
      {
        checksVoidReturn: { attributes: false },
      },
    ],
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
      },
    ],
    'import/no-default-export': 'off',
  },
};
