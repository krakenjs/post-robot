/* @flow */

import { type CrossDomainWindowType } from 'cross-domain-utils/src';
import { noop } from 'belter/src';

import { requestPromises } from './public';

export function cleanUpWindow(win : CrossDomainWindowType) {
    for (let promise of requestPromises.get(win, [])) {
        promise.reject(new Error(`Window cleaned up before response`)).catch(noop);
    }
}
