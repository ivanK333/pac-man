module.exports = {
  singleQuote: true,
  jsxSingleQuote: false,
  arrowParens: 'always',
  maxlength: ['error', 125, 2],
  tabWidth: 2,
  useTabs: false,
  endOfLine: process.platform === 'win32' ? 'crlf' : 'lf',
};
