
import { CONSTANTS } from './conf';
import { cleanup } from './lib/cleanup';

export let global = window[CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[CONSTANTS.WINDOW_PROPS.POSTROBOT] || {};

global.clean = global.clean || cleanup(global);

// Backwards compatibility

global.registerSelf = () => {
    // pass
};