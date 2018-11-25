import { isWindowClosed } from 'cross-domain-utils/src';

global.knownWindows = global.knownWindows || [];
global.onKnownWindow = global.onKnownWindow || [];

export function markWindowKnown(win) {
    global.knownWindows = global.knownWindows.filter(function (knownWindow) {
        return !isWindowClosed(knownWindow);
    });
    if (global.knownWindows.indexOf(win) === -1) {
        global.knownWindows.push(win);

        for (var _i2 = 0, _global$onKnownWindow2 = global.onKnownWindow, _length2 = _global$onKnownWindow2 == null ? 0 : _global$onKnownWindow2.length; _i2 < _length2; _i2++) {
            var handler = _global$onKnownWindow2[_i2];
            handler(win);
        }
    }
}

export function isWindowKnown(win) {
    return global.knownWindows.indexOf(win) !== -1;
}

export function getKnownWindows() {
    return global.knownWindows;
}

export function onKnownWindow(handler) {
    global.onKnownWindow.push(handler);

    for (var _i4 = 0, _global$knownWindows2 = global.knownWindows, _length4 = _global$knownWindows2 == null ? 0 : _global$knownWindows2.length; _i4 < _length4; _i4++) {
        var win = _global$knownWindows2[_i4];
        handler(win);
    }
}