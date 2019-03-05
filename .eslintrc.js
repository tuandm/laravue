'use strict'

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
  },
  env: {
    node: true,
    mocha: true,
  },
  extends: ['plugin:eslint-plugin/recommended', 'plugin:vue-libs/recommended'],
  plugins: ['eslint-plugin'],
  rules: {
    'eslint-plugin/report-message-format': ['error', "^[A-Z`'{].*\\.$"],
    'eslint-plugin/prefer-placeholders': 'error',
    'eslint-plugin/consistent-output': 'error',
    'no-mixed-operators': 'error',
    'space-before-function-paren': 'off',
    'vue/comma-dangle': ['error', 'always-multiline'],
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'no-mixed-operators': [
      "error",
      {
        "groups": [
          ["&", "|", "^", "~", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"]
        ],
        "allowSamePrecedence": true
      }
    ],
    'curly': [1, 'all'],
    'brace-style': [2, '1tbs'],
  },

  overrides: [
    {
      files: ['lib/rules/*.js'],
      rules: {
        'consistent-docs-description': 'error',
        'no-invalid-meta': 'error',
        'eslint-plugin/require-meta-type': 'error',
        'require-meta-docs-url': [
          'error',
          {
            pattern: `https://eslint.vuejs.org/rules/{{name}}.html`,
          },
        ],
      },
    },
  ],
}
