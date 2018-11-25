/* @flow */

import { type CrossDomainWindowType } from 'cross-domain-utils/src';
import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { uniqueID, getOrSet, noop, memoizePromise } from 'belter/src';
import { serializeType, type CustomSerializedType } from 'universal-serialize/src';

import { SERIALIZATION_TYPE } from '../conf';
import { global } from '../global';
import { getWindowInstanceID, onKnownWindow } from '../lib';

type SerializedProxyWindow = {|
    close : () => ZalgoPromise<void>,
    focus : () => ZalgoPromise<void>,
    setLocation : (string) => ZalgoPromise<void>,
    setName : (string) => ZalgoPromise<void>,
    serializedID : string,
    getInstanceID : () => ZalgoPromise<string>
|};

export class ProxyWindow {

    serializedWindow : SerializedProxyWindow
    actualWindow : CrossDomainWindowType
    actualWindowPromise : ZalgoPromise<CrossDomainWindowType>

    constructor(serializedWindow : SerializedProxyWindow) {
        this.serializedWindow = serializedWindow;
        this.actualWindowPromise = new ZalgoPromise();
        this.serializedWindow.getInstanceID = memoizePromise(this.serializedWindow.getInstanceID);
        this.waitForWindows();
    }

    waitForWindows() {
        onKnownWindow(win => {
            this.matchWindow(win).then(match => {
                if (match) {
                    this.setWindow(win);
                }
            }).catch(noop);
        });
    }

    setLocation(href : string) : ZalgoPromise<ProxyWindow> {
        return ZalgoPromise.try(() => {
            if (this.actualWindow) {
                this.actualWindow.location = href;
            } else {
                return this.serializedWindow.setLocation(href);
            }
        }).then(() => this);
    }

    setName(name : string) : ZalgoPromise<ProxyWindow> {
        return ZalgoPromise.try(() => {
            if (this.actualWindow) {
                // $FlowFixMe
                this.actualWindow.name = name;
            } else {
                return this.serializedWindow.setName(name);
            }
        }).then(() => this);
    }

    close() : ZalgoPromise<ProxyWindow> {
        return ZalgoPromise.try(() => {
            if (this.actualWindow) {
                this.actualWindow.close();
            } else {
                return this.serializedWindow.close();
            }
        }).then(() => this);
    }

    focus() : ZalgoPromise<ProxyWindow> {
        return ZalgoPromise.try(() => {
            if (this.actualWindow) {
                this.actualWindow.focus();
            } else {
                return this.serializedWindow.focus();
            }
        }).then(() => this);
    }

    setWindow(win : CrossDomainWindowType) {
        this.actualWindow = win;
        this.actualWindowPromise.resolve(win);
    }

    matchWindow(win : CrossDomainWindowType) : ZalgoPromise<boolean> {
        return ZalgoPromise.try(() => {
            if (this.actualWindow) {
                return win === this.actualWindow;
            }

            return ZalgoPromise.all([
                this.getInstanceID(),
                getWindowInstanceID(win)
            ]).then(([ proxyInstanceID, knownWindowInstanceID ]) => {
                return proxyInstanceID === knownWindowInstanceID;
            });
        });
    }

    hasWindow() : boolean {
        return Boolean(this.actualWindow);
    }

    awaitWindow() : ZalgoPromise<CrossDomainWindowType> {
        return this.actualWindowPromise;
    }

    getSerializedID() : string {
        return this.serializedWindow.serializedID;
    }

    getInstanceID() : ZalgoPromise<string> {
        if (this.actualWindow) {
            return getWindowInstanceID(this.actualWindow);
        } else {
            return this.serializedWindow.getInstanceID();
        }
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
                setLocation:   (href) => win.setLocation(href),
                // $FlowFixMe
                setName:       (name) => win.setName(name)
            }
            : {
                serializedID:  uniqueID(),
                getInstanceID: () => getWindowInstanceID(win),
                close:         () => ZalgoPromise.try(() => win.close()),
                focus:         () => ZalgoPromise.try(() => win.focus()),
                setLocation:   (href) => ZalgoPromise.try(() => {
                    win.location = href;
                }),
                setName:       (name) => ZalgoPromise.try(() => {
                    // $FlowFixMe
                    win.name = name;
                })
            }
        );
    });
}

global.deseserializedWindows = {};

export function deserializeWindow(source : CrossDomainWindowType, origin : string, win : SerializedProxyWindow) : ProxyWindow {
    return getOrSet(global.deseserializedWindows, win.serializedID, () => {
        return new ProxyWindow(win);
    });
}
