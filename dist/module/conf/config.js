'use strict';

exports.__esModule = true;
exports.CONFIG = undefined;

var _ALLOWED_POST_MESSAGE;

var _constants = require('./constants');

var CONFIG = exports.CONFIG = {

    ALLOW_POSTMESSAGE_POPUP: '__ALLOW_POSTMESSAGE_POPUP__' in window ? window.__ALLOW_POSTMESSAGE_POPUP__ : __POST_ROBOT__.__ALLOW_POSTMESSAGE_POPUP__,

    LOG_LEVEL: 'info',

    BRIDGE_TIMEOUT: 5000,
    CHILD_WINDOW_TIMEOUT: 5000,

    ACK_TIMEOUT: window.navigator.userAgent.match(/MSIE/i) !== -1 && !__TEST__ ? 2000 : 1000,
    RES_TIMEOUT: __TEST__ ? 2000 : -1,

    LOG_TO_PAGE: false,

    ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _ALLOWED_POST_MESSAGE[_constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = true, _ALLOWED_POST_MESSAGE[_constants.CONSTANTS.SEND_STRATEGIES.BRIDGE] = true, _ALLOWED_POST_MESSAGE[_constants.CONSTANTS.SEND_STRATEGIES.GLOBAL] = true, _ALLOWED_POST_MESSAGE),

    ALLOW_SAME_ORIGIN: false
};

if (window.location.href.indexOf(_constants.CONSTANTS.FILE_PROTOCOL) === 0) {
    CONFIG.ALLOW_POSTMESSAGE_POPUP = true;
}