/* @flow */

import { CONSTANTS } from './constants';

export let CONFIG : Object = {

    ALLOW_POSTMESSAGE_POPUP: ('__ALLOW_POSTMESSAGE_POPUP__' in window)
        ? window.__ALLOW_POSTMESSAGE_POPUP__
        : __ALLOW_POSTMESSAGE_POPUP__,

    LOG_LEVEL: 'info',

    BRIDGE_TIMEOUT: 5000,
    CHILD_WINDOW_TIMEOUT: 5000,

    ACK_TIMEOUT: (window.navigator.userAgent.match(/MSIE/i) !== -1 && !__TEST__) ? 2000 : 1000,
    RES_TIMEOUT: __TEST__ ? 2000 : Infinity,

    LOG_TO_PAGE: false,

    ALLOWED_POST_MESSAGE_METHODS: {
        [ CONSTANTS.SEND_STRATEGIES.POST_MESSAGE ]: true,
        [ CONSTANTS.SEND_STRATEGIES.BRIDGE ]: true,
        [ CONSTANTS.SEND_STRATEGIES.GLOBAL ]: true
    },

    ALLOW_SAME_ORIGIN: false
};

if (window.location.href.indexOf(CONSTANTS.FILE_PROTOCOL) === 0) {
    CONFIG.ALLOW_POSTMESSAGE_POPUP = true;
}
