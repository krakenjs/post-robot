/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { getAncestor, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { noop, uniqueID, once } from 'belter/src';

import { MESSAGE_NAME, WILDCARD } from '../conf';
import { global } from '../global';

global.helloPromises = global.helloPromises || new WeakMap();
global.knownWindows = global.knownWindows || new WeakMap();
global.uid = global.uid || uniqueID();

type Hello = {
    win : CrossDomainWindowType,
    domain : string,
    instanceID : string
};

global.instanceID = global.instanceID || uniqueID();

const listenForHello = once(() => {
    global.on(MESSAGE_NAME.HELLO, { domain: WILDCARD }, ({ source, origin }) => {
        global.helloPromises.getOrSet(source, () => new ZalgoPromise()).resolve({ win: source, domain: origin });
        return {
            instanceID: global.instanceID
        };
    });
});

export function sayHello(win : CrossDomainWindowType) : ZalgoPromise<Hello> {
    return global.send(win, MESSAGE_NAME.HELLO, {}, { domain: WILDCARD, timeout: -1 })
        .then(({ origin, data: { instanceID } }) => {
            return { win, domain: origin, instanceID };
        });
}

export function markWindowKnown(win : CrossDomainWindowType) {
    global.knownWindows.set(win, true);
}

export function isWindowKnown(win : CrossDomainWindowType) : boolean {
    return global.knownWindows.get(win);
}

export function initOnReady() {
    listenForHello();

    let parent = getAncestor();
    if (parent) {
        sayHello(parent).catch(noop);
    }
}

export function onChildWindowReady(win : mixed, timeout : number = 5000, name : string = 'Window') : ZalgoPromise<Hello> {
    let promise = global.helloPromises.getOrSet(win, () => new ZalgoPromise());

    if (timeout !== -1) {
        promise = promise.timeout(timeout, new Error(`${ name } did not load after ${ timeout }ms`));
    }

    return promise;
}
