import { WINDOW_PROP } from './conf';

export var global = window[WINDOW_PROP.POSTROBOT] = window[WINDOW_PROP.POSTROBOT] || {};

// Backwards compatibility

global.registerSelf = function () {
    // pass
};