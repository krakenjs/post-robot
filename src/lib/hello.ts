import type { CrossDomainWindowType } from 'cross-domain-utils';
import { getAncestor } from 'cross-domain-utils';
import { ZalgoPromise } from 'zalgo-promise';
import { uniqueID } from 'belter';

import { MESSAGE_NAME, WILDCARD } from '../conf';
import { windowStore, globalStore, getGlobal } from '../global';
import type { OnType, SendType, CancelableType } from '../types';

function getInstanceID(): string {
    return globalStore<string>('instance').getOrSet('instanceID', uniqueID);
}

function getHelloPromise(win: CrossDomainWindowType): ZalgoPromise<{
    domain: string;
}> {
    const helloPromises = windowStore<ZalgoPromise<any>>('helloPromises');
    return helloPromises.getOrSet(win, () => new ZalgoPromise());
}

function resolveHelloPromise(
    win: CrossDomainWindowType,
    // @ts-ignore
    { domain }
): ZalgoPromise<{
    domain: string;
}> {
    const helloPromises = windowStore<ZalgoPromise<any>>('helloPromises');
    const existingPromise = helloPromises.get(win);

    if (existingPromise) {
        existingPromise.resolve({
            domain
        });
    }

    const newPromise = ZalgoPromise.resolve({
        domain
    });
    helloPromises.set(win, newPromise);
    return newPromise;
}

function listenForHello({ on }: { on: OnType }): CancelableType {
    return on(
        MESSAGE_NAME.HELLO,
        {
            domain: WILDCARD
        },
        ({ source, origin }) => {
            resolveHelloPromise(source, {
                domain: origin
            });
            return {
                instanceID: getInstanceID()
            };
        }
    );
}

export function sayHello(
    win: CrossDomainWindowType,
    {
        send
    }: {
        send: SendType;
    }
): ZalgoPromise<{
    win: CrossDomainWindowType;
    domain: string;
    instanceID: string;
}> {
    return send(
        win,
        MESSAGE_NAME.HELLO,
        {
            instanceID: getInstanceID()
        },
        {
            domain: WILDCARD,
            timeout:-1
        }
    ).then(({ origin, data: { instanceID } }) => {
        resolveHelloPromise(win, {
            domain: origin
        });
        return {
            win,
            domain: origin,
            instanceID
        };
    });
}
export function getWindowInstanceID(
    win: CrossDomainWindowType,
    {
        send
    }: {
        send: SendType;
    }
): ZalgoPromise<string> {
    return windowStore<ZalgoPromise<any>>('windowInstanceIDPromises').getOrSet(win, () => {
        return sayHello(win, {
            send
        }).then(({ instanceID }) => instanceID);
    });
}
export function initHello({
    on,
    send
}: {
    on: OnType;
    send: SendType;
}): CancelableType {
    return globalStore<any>('builtinListeners').getOrSet('helloListener', () => {
        const listener = listenForHello({
            on
        });
        const parent = getAncestor();

        if (parent) {
            sayHello(parent, {
                send
            }).catch((err) => {
                if (__TEST__ && getGlobal(parent)) {
                    throw err;
                }
            });
        }

        return listener;
    });
}
export function awaitWindowHello(
    win: CrossDomainWindowType,
    timeout = 5000,
    name = 'Window'
): ZalgoPromise<{
    domain: string;
}> {
    let promise = getHelloPromise(win);

    if (timeout !== -1) {
        promise = promise.timeout(
            timeout,
            new Error(`${ name } did not load after ${ timeout }ms`)
        );
    }

    return promise;
}
