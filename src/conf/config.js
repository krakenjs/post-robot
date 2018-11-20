/* @flow */

import { SEND_STRATEGY, PROTOCOL } from './constants';

export let CONFIG : Object = {

    ALLOW_POSTMESSAGE_POPUP: ('__ALLOW_POSTMESSAGE_POPUP__' in window)
        ? window.__ALLOW_POSTMESSAGE_POPUP__
        : __POST_ROBOT__.__ALLOW_POSTMESSAGE_POPUP__,

    BRIDGE_TIMEOUT:       5000,
    CHILD_WINDOW_TIMEOUT: 5000,

    ACK_TIMEOUT:       2000,
    ACK_TIMEOUT_KNOWN: 10000,
    RES_TIMEOUT:       __TEST__ ? 2000 : -1,
    
    ALLOWED_POST_MESSAGE_METHODS: {
        [ SEND_STRATEGY.POST_MESSAGE ]: true,
        [ SEND_STRATEGY.BRIDGE ]:       true,
        [ SEND_STRATEGY.GLOBAL ]:       true
    }
};

if (window.location.href.indexOf(PROTOCOL.FILE) === 0) {
    CONFIG.ALLOW_POSTMESSAGE_POPUP = true;
}
