
import { CONSTANTS } from './conf';

export let global = window[CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[CONSTANTS.WINDOW_PROPS.POSTROBOT] || {};

// Backwards compatibility

global.registerSelf = () => {
    // pass
};