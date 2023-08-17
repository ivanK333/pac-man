module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/dot-notation': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-implied-eval': 0,
    '@typescript-eslint/no-throw-literal': 0,
    '@typescript-eslint/return-await': 0,
    'max-len': ['error', { code: 200 }],
    'class-methods-use-this': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],

    'import/no-unresolved': 'error',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
      },
    ],

    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,

    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react/display-name': 1,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        ignoreRestSiblings: true,
      },
    ],
    'no-unsafe-optional-chaining': 1,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
