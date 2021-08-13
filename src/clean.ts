import type { CrossDomainWindowType } from 'cross-domain-utils';
import { isWindowClosed } from 'cross-domain-utils';
import { noop } from 'belter';

import { windowStore } from './global';

export function cleanUpWindow(win: CrossDomainWindowType): void {
    const requestPromises: any = windowStore('requestPromises');

    for (const promise of requestPromises.get(win, [])) {
        promise
            .reject(
                new Error(
                    `Window ${
                        isWindowClosed(win) ? 'closed' : 'cleaned up'
                    } before response`
                )
            )
            .catch(noop);
    }
}
