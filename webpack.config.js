/* @flow */
/* eslint import/no-nodejs-modules: off */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import globals from './globals';

export let FILE_NAME = 'post-robot';
export let MODULE_NAME = 'postRobot';

export let WEBPACK_CONFIG = getWebpackConfig({
    filename:   `${ FILE_NAME }.js`,
    modulename: MODULE_NAME,
    vars:       {
        ...globals,

        __POST_ROBOT__: {
            ...globals.__POST_ROBOT__,
            __IE_POPUP_SUPPORT__:       false,
            __GLOBAL_MESSAGE_SUPPORT__: false
        }
    }
});

export let WEBPACK_CONFIG_MIN = getWebpackConfig({
    filename:   `${ FILE_NAME }.min.js`,
    modulename: MODULE_NAME,
    minify:     true,
    vars:       {
        ...globals,

        __POST_ROBOT__: {
            ...globals.__POST_ROBOT__,
            __IE_POPUP_SUPPORT__:       false,
            __GLOBAL_MESSAGE_SUPPORT__: false
        }
    }
});

export let WEBPACK_CONFIG_IE = getWebpackConfig({
    filename:   `${ FILE_NAME }.ie.js`,
    modulename: MODULE_NAME,
    vars:       globals
});

export let WEBPACK_CONFIG_IE_MIN = getWebpackConfig({
    filename:   `${ FILE_NAME }.ie.min.js`,
    modulename: MODULE_NAME,
    minify:     true,
    vars:       globals
});

export let WEBPACK_CONFIG_TEST = getWebpackConfig({
    filename:   `${ FILE_NAME }.js`,
    modulename: MODULE_NAME,
    test:       true,
    vars:       globals
});

export default [ WEBPACK_CONFIG, WEBPACK_CONFIG_MIN, WEBPACK_CONFIG_IE, WEBPACK_CONFIG_IE_MIN ];
