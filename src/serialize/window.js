/* @flow */

import { type CrossDomainWindowType } from 'cross-domain-utils/src';
import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { uniqueID, getOrSet } from 'belter/src';
import { serializeType, type CustomSerializedType } from 'universal-serialize/src';

import { SERIALIZATION_TYPE } from '../conf';
import { global } from '../global';
import { sayHello } from '../lib';

type SerializedProxyWindow = {|
    close : () => ZalgoPromise<void>,
    focus : () => ZalgoPromise<void>,
    setLocation : (string) => ZalgoPromise<void>,
    serializedID : string,
    getInstanceID : () => ZalgoPromise<string>
|};

export class ProxyWindow {

    serializedWindow : SerializedProxyWindow
    actualWindowPromise : ZalgoPromise<CrossDomainWindowType>

    constructor(serializedWindow : SerializedProxyWindow) {
        this.serializedWindow = serializedWindow;
        this.actualWindowPromise = new ZalgoPromise();
    }

    setLocation(href : string) : ZalgoPromise<ProxyWindow> {
        return this.serializedWindow.setLocation(href)
            .then(() => this);
    }

    close() : ZalgoPromise<ProxyWindow> {
        return this.serializedWindow.close()
            .then(() => this);
    }

    focus() : ZalgoPromise<ProxyWindow> {
        return this.serializedWindow.focus()
            .then(() => this);
    }

    setWindow(win : CrossDomainWindowType) {
        this.actualWindowPromise.resolve(win);
    }

    awaitWindow() : ZalgoPromise<CrossDomainWindowType> {
        return this.actualWindowPromise;
    }

    getSerializedID() : string {
        return this.serializedWindow.serializedID;
    }

    getInstanceID() : ZalgoPromise<string> {
        return this.serializedWindow.getInstanceID();
    }

    static isProxyWindow(obj : mixed) : boolean {
        return obj instanceof ProxyWindow;
    }
}

export type SerializedWindow = CustomSerializedType<typeof SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW, SerializedProxyWindow>;

global.serializedWindows = global.serializedWindows || new WeakMap();

export function serializeWindow(destination : CrossDomainWindowType, domain : string | Array<string>, win : CrossDomainWindowType) : SerializedWindow {
    return global.serializedWindows.getOrSet(win, () => {
        return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW, ProxyWindow.isProxyWindow(win)
            ? {
                // $FlowFixMe
                serializedID:  win.getSerializedID(),
                // $FlowFixMe
                getInstanceID: () => win.getInstanceID(),
                close:         () => win.close(),
                focus:         () => win.focus(),
                // $FlowFixMe
                setLocation:   (href : string) => win.setLocation(href)
            }
            : {
                serializedID:  uniqueID(),
                getInstanceID: () => sayHello(win).then(({ instanceID }) => instanceID),
                close:         () => ZalgoPromise.try(() => win.close()),
                focus:         () => ZalgoPromise.try(() => win.focus()),
                setLocation:   (href : string) => ZalgoPromise.try(() => {
                    win.location = href;
                })
            }
        );
    });
}

global.deseserializedWindows = {};

export function deserializeWindow(source : CrossDomainWindowType, origin : string, win : SerializedProxyWindow) : ProxyWindow {
    return getOrSet(global.deseserializedWindows, win.serializedID, () => new ProxyWindow(win));
}
