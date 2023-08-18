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
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/dot-notation': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-implied-eval': 0,
    '@typescript-eslint/no-throw-literal': 0,
    '@typescript-eslint/return-await': 0,
    'max-len': ['error', { code: 125 }],
    'class-methods-use-this': 0,
    'no-restricted-syntax': 'off',
    'no-constructor-return': 'off',
    'no-param-reassign': 'off',
    'no-continue': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/no-unused-expressions': 0,
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
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
    'react/display-name': 1,
    /** adding this line as getting error:
     * Casing of ./styles.module.scss does not match the underlying filesystem  import/no-unresolved */
    // 'import/no-unresolved': [2, { caseSensitive: false }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
