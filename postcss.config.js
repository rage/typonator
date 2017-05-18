module.exports = {
  plugins: [
    /* eslint-disable global-require */
    require('autoprefixer')(),
    require('postcss-class-prefix')('sd-'),
    /* eslint-enable global-require */
  ],
};
