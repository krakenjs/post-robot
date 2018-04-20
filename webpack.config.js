/* @flow */
/* eslint import/no-nodejs-modules: off */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

export let FILE_NAME = 'post-robot';
export let MODULE_NAME = 'postRobot';

export let WEBPACK_CONFIG = getWebpackConfig({
    filename:   `${ FILE_NAME }.js`,
    modulename: MODULE_NAME,
    vars:       {
        __IE_POPUP_SUPPORT__:        false,
        __ALLOW_POSTMESSAGE_POPUP__: true
    }
});

export let WEBPACK_CONFIG_MIN = getWebpackConfig({
    filename:   `${ FILE_NAME }.min.js`,
    modulename: MODULE_NAME,
    minify:     true,
    vars:       {
        __MIN__:                     true,
        __IE_POPUP_SUPPORT__:        false,
        __ALLOW_POSTMESSAGE_POPUP__: true
    }
});

export let WEBPACK_CONFIG_IE = getWebpackConfig({
    filename:   `${ FILE_NAME }.js`,
    modulename: MODULE_NAME,
    vars:       {
        __IE_POPUP_SUPPORT__:        true,
        __ALLOW_POSTMESSAGE_POPUP__: true
    }
});

export let WEBPACK_CONFIG_IE_MIN = getWebpackConfig({
    filename:   `${ FILE_NAME }.min.js`,
    modulename: MODULE_NAME,
    minify:     true,
    vars:       {
        __MIN__:                     true,
        __IE_POPUP_SUPPORT__:        true,
        __ALLOW_POSTMESSAGE_POPUP__: true
    }
});

export let WEBPACK_CONFIG_TEST = getWebpackConfig({
    filename:   `${ FILE_NAME }.js`,
    modulename: MODULE_NAME,
    options:    {
        devtool: 'inline-source-map'
    },
    vars: {
        __TEST__:                    true,
        __IE_POPUP_SUPPORT__:        true,
        __ALLOW_POSTMESSAGE_POPUP__: true
    }
});

export default [ WEBPACK_CONFIG, WEBPACK_CONFIG_MIN ];
