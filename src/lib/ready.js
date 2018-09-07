/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { getAncestor, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { CONSTANTS } from '../conf';
import { global } from '../global';

import { noop } from './util';

global.readyPromises = global.readyPromises || new WeakMap();

export function onHello(handler : ({ source? : CrossDomainWindowType, origin? : string }) => void) {
    global.on(CONSTANTS.POST_MESSAGE_NAMES.HELLO, { domain: CONSTANTS.WILDCARD }, ({ source, origin }) => {
        return handler({ source, origin });
    });
}

export function sayHello(win : CrossDomainWindowType) : ZalgoPromise<{ origin : string }> {
    return global.send(win, CONSTANTS.POST_MESSAGE_NAMES.HELLO, {}, { domain: CONSTANTS.WILDCARD, timeout: -1 })
        .then(({ origin }) => {
            return { origin };
        });
}

export function initOnReady() {

    onHello(({ source, origin }) => {
        let promise = global.readyPromises.get(source) || new ZalgoPromise();
        promise.resolve({ origin });
        global.readyPromises.set(source, promise);
    });

    let parent = getAncestor();
    if (parent) {
        sayHello(parent).catch(noop);
    }
}

export function onChildWindowReady(win : mixed, timeout : number = 5000, name : string = 'Window') : ZalgoPromise<{ origin : string }> {

    let promise = global.readyPromises.get(win);

    if (promise) {
        return promise;
    }

    promise = new ZalgoPromise();
    global.readyPromises.set(win, promise);

    if (timeout !== -1) {
        setTimeout(() => promise.reject(new Error(`${ name } did not load after ${ timeout }ms`)), timeout);
    }

    return promise;
}
