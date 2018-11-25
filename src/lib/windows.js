/* @flow */

import { type CrossDomainWindowType, isWindowClosed } from 'cross-domain-utils/src';

global.knownWindows = global.knownWindows || [];
global.onKnownWindow = global.onKnownWindow || [];

export function markWindowKnown(win : CrossDomainWindowType) {
    global.knownWindows = global.knownWindows.filter(knownWindow => !isWindowClosed(knownWindow));
    if (global.knownWindows.indexOf(win) === -1) {
        global.knownWindows.push(win);
        for (let handler of global.onKnownWindow) {
            handler(win);
        }
    }
}

export function isWindowKnown(win : CrossDomainWindowType) : boolean {
    return global.knownWindows.indexOf(win) !== -1;
}

export function getKnownWindows() : $ReadOnlyArray<CrossDomainWindowType> {
    return global.knownWindows;
}

export function onKnownWindow(handler : (CrossDomainWindowType) => void) {
    global.onKnownWindow.push(handler);
    for (let win of global.knownWindows) {
        handler(win);
    }
}
