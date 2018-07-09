'use strict';

exports.__esModule = true;
exports.cleanUpWindow = cleanUpWindow;

require('cross-domain-utils/src');

var _global = require('./global');

function cleanUpWindow(win) {

    // global.tunnelWindows
    // global.bridges
    // global.popupWindowsByName
    // global.responseListeners
    // global.requestListeners

    var requestPromises = _global.global.requestPromises.get(win);

    if (requestPromises) {
        for (var _iterator = requestPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var promise = _ref;

            promise.reject(new Error('No response from window - cleaned up'));
        }
    }

    if (_global.global.popupWindowsByWin) {
        _global.global.popupWindowsByWin['delete'](win);
    }

    if (_global.global.remoteWindows) {
        _global.global.remoteWindows['delete'](win);
    }

    _global.global.requestPromises['delete'](win);
    _global.global.methods['delete'](win);
    _global.global.readyPromises['delete'](win);
}