/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { getAncestor } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { CONSTANTS } from '../conf';
import { on, send } from '../interface';
import { log } from './log';
import { global } from '../global';
import { stringifyError } from './util';

global.readyPromises = global.readyPromises || new WeakMap();

export function initOnReady() {

    on(CONSTANTS.POST_MESSAGE_NAMES.READY, { domain: CONSTANTS.WILDCARD }, (event : { source : CrossDomainWindowType, origin : string, data : Object }) => {

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
            log.debug(stringifyError(err));
        });
    }
}

export function onWindowReady(win : mixed, timeout : number = 5000, name : string = 'Window') : ZalgoPromise<{ source : mixed, origin : string, data : Object }> {

    let promise = global.readyPromises.get(win);

    if (promise) {
        return promise;
    }

    promise = new ZalgoPromise();
    global.readyPromises.set(win, promise);
    setTimeout(() => promise.reject(new Error(`${name} did not load after ${timeout}ms`)), timeout);

    return promise;
}
