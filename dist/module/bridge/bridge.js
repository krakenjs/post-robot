import 'zalgo-promise/src';
import { getParent, isWindowClosed } from 'cross-domain-utils/src';
import { noop, uniqueID } from 'belter/src';

import { MESSAGE_NAME, WILDCARD } from '../conf';
import { global, globalStore } from '../global';

/*
    HERE BE DRAGONS

    Warning: this file may look weird. Why save the tunnel window in an Object
    by ID, then look it up later, rather than just using the reference from the closure scope?

    The reason is, that ends up meaning the garbage collector can never get its hands
    on a closed window, since our closure has continued access to it -- and post-robot
    has no good way to know whether to clean up the function with the closure scope.

    If you're editing this file, be sure to run significant memory / GC tests afterwards.
*/

var tunnelWindows = globalStore('tunnelWindows');

function cleanTunnelWindows() {
    for (var _i2 = 0, _tunnelWindows$keys2 = tunnelWindows.keys(), _length2 = _tunnelWindows$keys2 == null ? 0 : _tunnelWindows$keys2.length; _i2 < _length2; _i2++) {
        var key = _tunnelWindows$keys2[_i2];
        var tunnelWindow = tunnelWindows[key];

        try {
            noop(tunnelWindow.source);
        } catch (err) {
            tunnelWindows.del(key);
            continue;
        }

        if (isWindowClosed(tunnelWindow.source)) {
            tunnelWindows.del(key);
        }
    }
}

function addTunnelWindow(_ref) {
    var name = _ref.name,
        source = _ref.source,
        canary = _ref.canary,
        sendMessage = _ref.sendMessage;

    cleanTunnelWindows();
    var id = uniqueID();
    tunnelWindows.set(id, { name: name, source: source, canary: canary, sendMessage: sendMessage });
    return id;
}

global.openTunnelToParent = function openTunnelToParent(_ref2) {
    var name = _ref2.name,
        source = _ref2.source,
        canary = _ref2.canary,
        sendMessage = _ref2.sendMessage;


    var parentWindow = getParent(window);

    if (!parentWindow) {
        throw new Error('No parent window found to open tunnel to');
    }

    var id = addTunnelWindow({ name: name, source: source, canary: canary, sendMessage: sendMessage });

    return global.send(parentWindow, MESSAGE_NAME.OPEN_TUNNEL, {

        name: name,

        sendMessage: function sendMessage() {

            var tunnelWindow = tunnelWindows.get(id);

            try {
                // IE gets antsy if you try to even reference a closed window
                noop(tunnelWindow && tunnelWindow.source);
            } catch (err) {
                tunnelWindows.del(id);
                return;
            }

            if (!tunnelWindow || !tunnelWindow.source || isWindowClosed(tunnelWindow.source)) {
                return;
            }

            try {
                tunnelWindow.canary();
            } catch (err) {
                return;
            }

            tunnelWindow.sendMessage.apply(this, arguments);
        }
    }, { domain: WILDCARD });
};