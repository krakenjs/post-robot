import { WeakMap } from 'cross-domain-safe-weakmap/src';
import 'cross-domain-utils/src';

global.knownWindows = global.knownWindows || new WeakMap();

export function markWindowKnown(win) {
    global.knownWindows.set(win, true);
}

export function isWindowKnown(win) {
    return global.knownWindows.get(win, false);
}