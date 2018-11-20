/* @flow */

import { WINDOW_PROP } from './conf';

export let global : Object = window[WINDOW_PROP.POSTROBOT] = window[WINDOW_PROP.POSTROBOT] || {};

// Backwards compatibility

global.registerSelf = () => {
    // pass
};
