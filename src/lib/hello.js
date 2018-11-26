/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { getAllWindows, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { noop, uniqueID, once, weakMapMemoizePromise } from 'belter/src';

import { MESSAGE_NAME, WILDCARD } from '../conf';
import { global } from '../global';

global.instanceID = global.instanceID || uniqueID();
global.helloPromises = global.helloPromises || new WeakMap();
global.onHello = global.onHello || [];

function getHelloPromise(win : CrossDomainWindowType) : ZalgoPromise<{ win : CrossDomainWindowType, domain : string }> {
    return global.helloPromises.getOrSet(win, () => new ZalgoPromise());
}

const listenForHello = once(() => {
    global.on(MESSAGE_NAME.HELLO, { domain: WILDCARD }, ({ source, origin }) => {
        getHelloPromise(source).resolve({ win: source, domain: origin });
        return { instanceID: global.instanceID };
    });
});

export function sayHello(win : CrossDomainWindowType) : ZalgoPromise<{ win : CrossDomainWindowType, domain : string, instanceID : string }> {
    return global.send(win, MESSAGE_NAME.HELLO, { instanceID: global.instanceID }, { domain: WILDCARD, timeout: -1 })
        .then(({ origin, data: { instanceID } }) => {
            getHelloPromise(win).resolve({ win, domain: origin });
            return { win, domain: origin, instanceID };
        });
}

export let getWindowInstanceID = weakMapMemoizePromise((win : CrossDomainWindowType) : ZalgoPromise<string> => {
    return sayHello(win).then(({ instanceID }) => instanceID);
});

export function initHello() {
    listenForHello();

    for (let win of getAllWindows()) {
        if (win !== window) {
            sayHello(win).catch(noop);
        }
    }
}

export function awaitWindowHello(win : CrossDomainWindowType, timeout : number = 5000, name : string = 'Window') : ZalgoPromise<{ win : CrossDomainWindowType, domain : string }> {
    let promise = getHelloPromise(win);

    if (timeout !== -1) {
        promise = promise.timeout(timeout, new Error(`${ name } did not load after ${ timeout }ms`));
    }

    return promise;
}
