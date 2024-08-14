const globals = require('globals');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.node,
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 12,
      },
    },
    rules: {
      'no-console': 'off',
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
    },
  },
];
