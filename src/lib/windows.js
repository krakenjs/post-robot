/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { type CrossDomainWindowType } from 'cross-domain-utils/src';

global.knownWindows = global.knownWindows || new WeakMap();

export function markWindowKnown(win : CrossDomainWindowType) {
    global.knownWindows.set(win, true);
}

export function isWindowKnown(win : CrossDomainWindowType) : boolean {
    return global.knownWindows.get(win, false);
}
