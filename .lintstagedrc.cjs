const path = require('path');

const runEslint = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

const runPrettier = 'prettier --write';

module.exports = {
  '*.{cjs,mjs,js,jsx,ts,tsx}': [runPrettier, runEslint],
  '*.json': runPrettier,
};
