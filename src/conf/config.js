/* @flow */

import { CONSTANTS } from './constants';

export let CONFIG : Object = {

    ALLOW_POSTMESSAGE_POPUP: __TEST__ ? false : true,

    LOG_LEVEL: 'info',

    BRIDGE_TIMEOUT: 5000,

    ACK_TIMEOUT: 1000,
    RES_TIMEOUT: __TEST__ ? 2000 : 10000,

    LOG_TO_PAGE: false,

    ALLOWED_POST_MESSAGE_METHODS: {
        [ CONSTANTS.SEND_STRATEGIES.POST_MESSAGE ]: true,
        [ CONSTANTS.SEND_STRATEGIES.BRIDGE ]: true,
        [ CONSTANTS.SEND_STRATEGIES.GLOBAL ]: true
    }
};

if (window.location.href.indexOf(CONSTANTS.FILE_PROTOCOL) === 0) {
    CONFIG.ALLOW_POSTMESSAGE_POPUP = true;
}
