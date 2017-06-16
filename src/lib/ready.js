
import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { getAncestor } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { CONSTANTS } from '../conf';
import { on, send } from '../interface';
import { log } from './log';
import { global } from '../global';

global.readyPromises = global.readyPromises || new WeakMap();

export function initOnReady() {

    on(CONSTANTS.POST_MESSAGE_NAMES.READY, { window: CONSTANTS.WILDCARD, domain: CONSTANTS.WILDCARD }, event => {

        let win = event.source;
        let promise = global.readyPromises.get(win);

        if (promise) {
            promise.resolve(event);
        } else {
            promise = new ZalgoPromise().resolve(event);
            global.readyPromises.set(win, promise);
        }
    });

    let parent = getAncestor();

    if (parent) {
        send(parent, CONSTANTS.POST_MESSAGE_NAMES.READY, {}, { domain: CONSTANTS.WILDCARD, timeout: Infinity }).catch(err => {
            log.debug(err.stack || err.toString());
        });
    }
}

export function onWindowReady(win, timeout = 5000, name = 'Window') {

    let promise = global.readyPromises.get(win);

    if (promise) {
        return promise;
    }

    promise = new ZalgoPromise();
    global.readyPromises.set(win, promise);
    setTimeout(() => promise.reject(new Error(`${name} did not load after ${timeout}ms`)), timeout);

    return promise;
}
