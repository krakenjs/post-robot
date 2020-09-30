/* @flow */
/* eslint import/no-commonjs: 0 */

const pkg = require('./package.json');

const formatVersion = (version) => {
    return version.replace(/[^\d]+/g, '_');
};

module.exports = {
    __POST_ROBOT__: {
        __GLOBAL_KEY__:              `__post_robot_${ formatVersion(pkg.version) }__`,
        __AUTO_SETUP__:              true,
        __IE_POPUP_SUPPORT__:        true,
        __GLOBAL_MESSAGE_SUPPORT__:  true,
        __SCRIPT_NAMESPACE__:        false
    }
};
