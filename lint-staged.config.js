module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix', 'git add'],
  '*.{css,scss,md,html}': ['prettier --write', 'git add'],
}
