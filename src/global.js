/* @flow */

import { CONSTANTS } from './conf';

export let global : Object = window[CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[CONSTANTS.WINDOW_PROPS.POSTROBOT] || {};

// Backwards compatibility

global.registerSelf = () => {
    // pass
};
