/* @flow */

import { isSameDomain, isWindowClosed, type CrossDomainWindowType, type DomainMatcher, getOpener, WINDOW_TYPE, isWindow } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { uniqueID, memoizePromise } from 'belter/src';
import { serializeType, type CustomSerializedType } from 'universal-serialize/src';

import { SERIALIZATION_TYPE } from '../conf';
import { windowStore, globalStore } from '../global';
import { getWindowInstanceID } from '../lib';
import { linkWindow } from '../bridge';
import type { OnType, SendType } from '../types';

function cleanupProxyWindows() {
    const idToProxyWindow = globalStore('idToProxyWindow');
    for (const id of idToProxyWindow.keys()) {
        // $FlowFixMe
        if (idToProxyWindow.get(id).shouldClean()) {
            idToProxyWindow.del(id);
        }
    }
}

type SerializedProxyWindow = {|
    id : string,
    type : $Values<typeof WINDOW_TYPE>,
    close : () => ZalgoPromise<void>,
    focus : () => ZalgoPromise<void>,
    isClosed : () => ZalgoPromise<boolean>,
    setLocation : (string) => ZalgoPromise<void>,
    setName : (string) => ZalgoPromise<void>,
    getInstanceID : () => ZalgoPromise<string>
|};

export class ProxyWindow {

    isProxyWindow : true = true
    serializedWindow : SerializedProxyWindow
    actualWindow : CrossDomainWindowType
    actualWindowPromise : ZalgoPromise<CrossDomainWindowType>
    send : SendType

    constructor(serializedWindow : SerializedProxyWindow, actualWindow? : ?CrossDomainWindowType, { send } : { send : SendType }) {
        this.serializedWindow = serializedWindow;
        this.actualWindowPromise = new ZalgoPromise();
        if (actualWindow) {
            this.setWindow(actualWindow);
        }
        this.serializedWindow.getInstanceID = memoizePromise(this.serializedWindow.getInstanceID);
        this.send = send;
    }

    getType() : $Values<typeof WINDOW_TYPE> {
        return this.serializedWindow.type;
    }

    isPopup() : boolean {
        return this.getType() === WINDOW_TYPE.POPUP;
    }

    isIframe() : boolean {
        return this.getType() === WINDOW_TYPE.IFRAME;
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
                if (!isSameDomain(this.actualWindow)) {
                    throw new Error(`Can not set name for window on different domain`);
                }
                // $FlowFixMe
                this.actualWindow.name = name;
                // $FlowFixMe
                if (this.actualWindow.frameElement) {
                    // $FlowFixMe
                    this.actualWindow.frameElement.setAttribute('name', name);
                }

                if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
                    
                    linkWindow({ win: this.actualWindow, name });
                }

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
            }
            return this.serializedWindow.focus();
        }).then(() => this);
    }

    isClosed() : ZalgoPromise<boolean> {
        return ZalgoPromise.try(() => {
            if (this.actualWindow) {
                return isWindowClosed(this.actualWindow);
            } else {
                return this.serializedWindow.isClosed();
            }
        });
    }

    getWindow() : ?CrossDomainWindowType {
        return this.actualWindow;
    }

    setWindow(win : CrossDomainWindowType) {
        this.actualWindow = win;
        this.actualWindowPromise.resolve(win);
    }

    awaitWindow() : ZalgoPromise<CrossDomainWindowType> {
        return this.actualWindowPromise;
    }

    matchWindow(win : CrossDomainWindowType) : ZalgoPromise<boolean> {
        return ZalgoPromise.try(() => {
            if (this.actualWindow) {
                return win === this.actualWindow;
            }
            
            return ZalgoPromise.all([
                this.getInstanceID(),
                getWindowInstanceID(win, { send: this.send })
            ]).then(([ proxyInstanceID, knownWindowInstanceID ]) => {
                const match = proxyInstanceID === knownWindowInstanceID;

                if (match) {
                    this.setWindow(win);
                }

                return match;
            });
        });
    }

    unwrap() : CrossDomainWindowType | ProxyWindow {
        return this.actualWindow || this;
    }

    getInstanceID() : ZalgoPromise<string> {
        if (this.actualWindow) {
            return getWindowInstanceID(this.actualWindow, { send: this.send });
        } else {
            return this.serializedWindow.getInstanceID();
        }
    }

    serialize() : SerializedProxyWindow {
        return this.serializedWindow;
    }

    shouldClean() : boolean {
        return this.actualWindow && isWindowClosed(this.actualWindow);
    }

    static unwrap(win : CrossDomainWindowType | ProxyWindow) : CrossDomainWindowType | ProxyWindow {
        return ProxyWindow.isProxyWindow(win)
            // $FlowFixMe
            ? win.unwrap()
            : win;
    }

    static serialize(win : CrossDomainWindowType | ProxyWindow, { send } : { send : SendType }) : SerializedProxyWindow {
        cleanupProxyWindows();

        return ProxyWindow.toProxyWindow(win, { send }).serialize();
    }

    static deserialize(serializedWindow : SerializedProxyWindow, { on, send } : { on : OnType, send : SendType }) : ProxyWindow {
        cleanupProxyWindows();
        
        return globalStore('idToProxyWindow').getOrSet(serializedWindow.id, () => {
            return new ProxyWindow(serializedWindow, null, { on, send });
        });
    }

    static isProxyWindow(obj : CrossDomainWindowType | ProxyWindow) : boolean {
        // $FlowFixMe
        return Boolean(obj && !isWindow(obj) && obj.isProxyWindow);
    }

    static toProxyWindow(win : CrossDomainWindowType | ProxyWindow, { send } : { send : SendType }) : ProxyWindow {
        cleanupProxyWindows();

        if (ProxyWindow.isProxyWindow(win)) {
            // $FlowFixMe
            return win;
        }

        // $FlowFixMe
        return windowStore('winToProxyWindow').getOrSet(win, () => {
            const id = uniqueID();

            return globalStore('idToProxyWindow').set(id, new ProxyWindow({
                id,
                // $FlowFixMe
                type:          getOpener(win) ? WINDOW_TYPE.POPUP : WINDOW_TYPE.IFRAME,
                // $FlowFixMe
                getInstanceID: () => getWindowInstanceID(win, { send }),
                close:         () => ZalgoPromise.try(() => {
                    win.close();
                }),
                focus:         () => ZalgoPromise.try(() => {
                    win.focus();
                }),
                isClosed:      () => ZalgoPromise.try(() => {
                    // $FlowFixMe
                    return isWindowClosed(win);
                }),
                setLocation:   (href) => ZalgoPromise.try(() => {
                    // $FlowFixMe
                    if (isSameDomain(win)) {
                        try {
                            if (win.location && typeof win.location.replace === 'function') {
                                // $FlowFixMe
                                win.location.replace(href);
                                return;
                            }
                        } catch (err) {
                            // pass
                        }
                    }
    
                    // $FlowFixMe
                    win.location = href;
                }),
                setName:       (name) => ZalgoPromise.try(() => {
                    if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
                        // $FlowFixMe
                        linkWindow({ win, name });
                    }
                    // $FlowFixMe
                    win.name = name;
                })
            // $FlowFixMe
            }, win, { send }));
        });
    }
}

export type SerializedWindow = CustomSerializedType<typeof SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW, SerializedProxyWindow>;

export function serializeWindow(destination : CrossDomainWindowType | ProxyWindow, domain : DomainMatcher, win : CrossDomainWindowType, { send } : { send : SendType }) : SerializedWindow {
    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW, ProxyWindow.serialize(win, { send }));
}

export function deserializeWindow(source : CrossDomainWindowType | ProxyWindow, origin : string, win : SerializedProxyWindow, { on, send } : { on : OnType, send : SendType }) : ProxyWindow {
    return ProxyWindow.deserialize(win, { on, send });
}
