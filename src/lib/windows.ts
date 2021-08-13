import type { CrossDomainWindowType } from 'cross-domain-utils';

import { windowStore } from '../global';

export function markWindowKnown(win: CrossDomainWindowType): void {
    const knownWindows = windowStore('knownWindows');
    knownWindows.set(win, true);
}
export function isWindowKnown(win: CrossDomainWindowType): boolean {
    const knownWindows = windowStore<boolean>('knownWindows');
    return knownWindows.get(win, false);
}
