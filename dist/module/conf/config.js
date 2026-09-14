"use strict";

exports.__esModule = true;
exports.RES_TIMEOUT = exports.RESPONSE_CYCLE_TIME = exports.CHILD_WINDOW_TIMEOUT = exports.BRIDGE_TIMEOUT = exports.ACK_TIMEOUT_KNOWN = exports.ACK_TIMEOUT = void 0;
const BRIDGE_TIMEOUT = exports.BRIDGE_TIMEOUT = 5000;
const CHILD_WINDOW_TIMEOUT = exports.CHILD_WINDOW_TIMEOUT = 5000;
const ACK_TIMEOUT = exports.ACK_TIMEOUT = 2000;
const ACK_TIMEOUT_KNOWN = exports.ACK_TIMEOUT_KNOWN = 10000;
const RES_TIMEOUT = exports.RES_TIMEOUT = __TEST__ ? 2000 : -1;
const RESPONSE_CYCLE_TIME = exports.RESPONSE_CYCLE_TIME = 500;