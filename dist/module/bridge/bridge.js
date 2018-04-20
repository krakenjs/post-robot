'use strict';

require('zalgo-promise/src');

var _src = require('cross-domain-utils/src');

var _conf = require('../conf');

var _lib = require('../lib');

var _global = require('../global');

/*
    HERE BE DRAGONS

    Warning: this file may look weird. Why save the tunnel window in an Object
    by ID, then look it up later, rather than just using the reference from the closure scope?

    The reason is, that ends up meaning the garbage collector can never get its hands
    on a closed window, since our closure has continued access to it -- and post-robot
    has no good way to know whether to clean up the function with the closure scope.

    If you're editing this file, be sure to run significant memory / GC tests afterwards.
*/

_global.global.tunnelWindows = _global.global.tunnelWindows || {};

_global.global.tunnelWindowId = 0;

function deleteTunnelWindow(id) {

    try {
        if (_global.global.tunnelWindows[id]) {
            delete _global.global.tunnelWindows[id].source;
        }
    } catch (err) {
        // pass
    }

    delete _global.global.tunnelWindows[id];
}

function cleanTunnelWindows() {
    var tunnelWindows = _global.global.tunnelWindows;

    for (var _iterator = Object.keys(tunnelWindows), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var key = _ref;

        var tunnelWindow = tunnelWindows[key];

        try {
            (0, _lib.noop)(tunnelWindow.source);
        } catch (err) {
            deleteTunnelWindow(key);
            continue;
        }

        if ((0, _src.isWindowClosed)(tunnelWindow.source)) {
            deleteTunnelWindow(key);
        }
    }
}

function addTunnelWindow(_ref2) {
    var name = _ref2.name,
        source = _ref2.source,
        canary = _ref2.canary,
        sendMessage = _ref2.sendMessage;

    cleanTunnelWindows();
    _global.global.tunnelWindowId += 1;
    _global.global.tunnelWindows[_global.global.tunnelWindowId] = { name: name, source: source, canary: canary, sendMessage: sendMessage };
    return _global.global.tunnelWindowId;
}

function getTunnelWindow(id) {
    return _global.global.tunnelWindows[id];
}

_global.global.openTunnelToParent = function openTunnelToParent(_ref3) {
    var name = _ref3.name,
        source = _ref3.source,
        canary = _ref3.canary,
        sendMessage = _ref3.sendMessage;


    var parentWindow = (0, _src.getParent)(window);

    if (!parentWindow) {
        throw new Error('No parent window found to open tunnel to');
    }

    var id = addTunnelWindow({ name: name, source: source, canary: canary, sendMessage: sendMessage });

    return _global.global.send(parentWindow, _conf.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {

        name: name,

        sendMessage: function sendMessage() {

            var tunnelWindow = getTunnelWindow(id);

            try {
                // IE gets antsy if you try to even reference a closed window
                (0, _lib.noop)(tunnelWindow && tunnelWindow.source);
            } catch (err) {
                deleteTunnelWindow(id);
                return;
            }

            if (!tunnelWindow || !tunnelWindow.source || (0, _src.isWindowClosed)(tunnelWindow.source)) {
                return;
            }

            try {
                tunnelWindow.canary();
            } catch (err) {
                return;
            }

            tunnelWindow.sendMessage.apply(this, arguments);
        }
    }, { domain: _conf.CONSTANTS.WILDCARD });
};