'use strict';

exports.__esModule = true;
exports.CONSTANTS = exports.CONFIG = undefined;

var _conf = require('../conf');

Object.defineProperty(exports, 'CONFIG', {
    enumerable: true,
    get: function get() {
        return _conf.CONFIG;
    }
});
Object.defineProperty(exports, 'CONSTANTS', {
    enumerable: true,
    get: function get() {
        return _conf.CONSTANTS;
    }
});
exports.disable = disable;

var _drivers = require('../drivers');

function disable() {
    delete window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];
    window.removeEventListener('message', _drivers.messageListener);
}