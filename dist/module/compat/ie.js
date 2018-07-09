'use strict';

exports.__esModule = true;
exports.emulateIERestrictions = emulateIERestrictions;

var _src = require('cross-domain-utils/src');

var _conf = require('../conf');

function emulateIERestrictions(sourceWindow, targetWindow) {
    if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP) {

        if ((0, _src.isSameTopWindow)(sourceWindow, targetWindow) === false) {
            throw new Error('Can not send and receive post messages between two different windows (disabled to emulate IE)');
        }
    }
}