import 'cross-domain-utils/src';

import { windowStore } from '../global';

var knownWindows = windowStore('knownWindows');

export function markWindowKnown(win) {
    knownWindows.set(win, true);
}

export function isWindowKnown(win) {
    return knownWindows.get(win, false);
}