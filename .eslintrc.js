module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'standard', 'prettier'],
}
