import config from 'eslint-config-standard'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...[].concat(config),
  {
    rules: {
      semi: 'off',
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
      'import/no-extraneous-dependencies': 'error'
    }
  }
]
