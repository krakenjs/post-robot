/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { getAncestor, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { noop } from 'belter/src';

import { MESSAGE_NAME, WILDCARD } from '../conf';
import { global } from '../global';


global.readyPromises = global.readyPromises || new WeakMap();
global.knownWindows = global.knownWindows || new WeakMap();

export function onHello(handler : ({ source? : CrossDomainWindowType, origin? : string }) => void) {
    global.on(MESSAGE_NAME.HELLO, { domain: WILDCARD }, ({ source, origin }) => {
        return handler({ source, origin });
    });
}

export function sayHello(win : CrossDomainWindowType) : ZalgoPromise<{ origin : string }> {
    return global.send(win, MESSAGE_NAME.HELLO, {}, { domain: WILDCARD, timeout: -1 })
        .then(({ origin }) => {
            return { origin };
        });
}

export function markWindowKnown(win : CrossDomainWindowType) {
    global.knownWindows.set(win, true);
}

export function isWindowKnown(win : CrossDomainWindowType) : boolean {
    return global.knownWindows.get(win);
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
