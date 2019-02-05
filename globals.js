/* @flow */
/* eslint import/no-commonjs: 0 */

const { getCurrentVersion } = require('grumbler-scripts/config/webpack.config');

const pkg = require('./package.json');

module.exports = {
    __POST_ROBOT__: {
        __GLOBAL_KEY__:              `__post_robot_${ getCurrentVersion(pkg) }__`,
        __AUTO_SETUP__:              true,
        __IE_POPUP_SUPPORT__:        true,
        __GLOBAL_MESSAGE_SUPPORT__:  true
    }
};
