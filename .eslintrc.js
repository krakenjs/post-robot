/* @flow */

module.exports = {
  extends:
    "./node_modules/@krakenjs/grumbler-scripts/config/.eslintrc-browser.js",

  globals: {
    __POST_ROBOT__: true,
  },
};
