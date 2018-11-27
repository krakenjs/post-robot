/* @flow */

import { type CrossDomainWindowType } from 'cross-domain-utils/src';

import { windowStore } from '../global';

let knownWindows = windowStore('knownWindows');

export function markWindowKnown(win : CrossDomainWindowType) {
    knownWindows.set(win, true);
}

export function isWindowKnown(win : CrossDomainWindowType) : boolean {
    return knownWindows.get(win, false);
}
