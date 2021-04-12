module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-typescript', 'plugin:react/recommended', 'prettier'],
  ignorePatterns: ['.eslintrc.js', 'postcss.config.js', 'tailwind.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/prop-types': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: 'either',
        depth: 25,
      },
    ],
  },
};
