module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'jest'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    include: ['src/pages/*', 'src/contexts'],
  },
  rules: {
    'linebreak-style': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'manual',
      },
    ],
    'react/no-unused-prop-types': 1,
    'react-hooks/rules-of-hooks': 'error',
    'import/no-duplicates': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/camelcase': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-unused-expressions': 'off',
    'react/jsx-curly-newline': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    camelcase: 'off',
    'react/no-array-index-key': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-children-prop': 'off',
    'no-empty': 'warn',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-plusplus': 'off',
    'no-empty': 'off',
  },
};