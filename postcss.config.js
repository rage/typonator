module.exports = {
  plugins: [
    /* eslint-disable global-require */
    require('autoprefixer')(),
    require('postcss-class-prefix')('typonator-'),
    /* eslint-enable global-require */
  ],
};
