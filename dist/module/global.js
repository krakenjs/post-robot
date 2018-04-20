'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.global = undefined;

var _conf = require('./conf');

var global = exports.global = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] || {};

// Backwards compatibility

global.registerSelf = function () {
    // pass
};