/* @flow */

import { isSameDomain, isWindowClosed, type CrossDomainWindowType, closeWindow,
    type DomainMatcher, getOpener, WINDOW_TYPE, isWindow, assertSameDomain } from 'cross-domain-utils/src';
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
    getName : () => ZalgoPromise<?string>,
    setName : (string) => ZalgoPromise<void>,
    getInstanceID : () => ZalgoPromise<string>
|};

function getSerializedWindow(id : string, win : CrossDomainWindowType, { send } : { send : SendType }) : SerializedProxyWindow {
    let windowName;
    
    return {
        id,
        type:          getOpener(win) ? WINDOW_TYPE.POPUP : WINDOW_TYPE.IFRAME,
        getInstanceID: memoizePromise(() => getWindowInstanceID(win, { send })),
        close:         () => ZalgoPromise.try(() => {
            closeWindow(win);
        }),
        getName: () => ZalgoPromise.try(() => {
            if (isWindowClosed(win)) {
                return;
            }

            return windowName;
        }),
        focus:   () => ZalgoPromise.try(() => {
            win.focus();
        }),
        isClosed: () => ZalgoPromise.try(() => {
            return isWindowClosed(win);
        }),
        setLocation: (href) => ZalgoPromise.try(() => {
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

            win.location = href;
        }),
        setName: (name) => ZalgoPromise.try(() => {
            if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
                linkWindow({ win, name });
            }

            win = assertSameDomain(win);

            win.name = name;

            if (win.frameElement) {
                win.frameElement.setAttribute('name', name);
            }

            windowName = name;
        })
    };
}

export class ProxyWindow {

    isProxyWindow : true = true
    serializedWindow : SerializedProxyWindow
    actualWindow : CrossDomainWindowType
    actualWindowPromise : ZalgoPromise<CrossDomainWindowType>
    send : SendType
    name : string

    constructor(serializedWindow : SerializedProxyWindow, actualWindow? : ?CrossDomainWindowType, { send } : { send : SendType }) {
        this.serializedWindow = serializedWindow;
        this.actualWindowPromise = new ZalgoPromise();
        this.send = send;
        if (actualWindow) {
            this.setWindow(actualWindow);
        }
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
        return this.serializedWindow.setLocation(href).then(() => this);
    }

    setName(name : string) : ZalgoPromise<ProxyWindow> {
        return this.serializedWindow.setName(name).then(() => this);
    }

    close() : ZalgoPromise<ProxyWindow> {
        return this.serializedWindow.close().then(() => this);
    }

    focus() : ZalgoPromise<ProxyWindow> {
        return ZalgoPromise.try(() => {
            return ZalgoPromise.all([
                this.isPopup() && this.serializedWindow.getName().then(name => {
                    if (name) {
                        window.open('', name);
                    }
                }),
                this.serializedWindow.focus()
            ]);
        }).then(() => this);
    }

    isClosed() : ZalgoPromise<boolean> {
        return this.serializedWindow.isClosed();
    }

    getWindow() : ?CrossDomainWindowType {
        return this.actualWindow;
    }

    setWindow(win : CrossDomainWindowType) {
        this.actualWindow = win;
        this.serializedWindow = getSerializedWindow(this.serializedWindow.id, win, { send: this.send });
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
        return this.serializedWindow.getInstanceID();
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
        const realWin : CrossDomainWindowType = win;

        // $FlowFixMe
        return windowStore('winToProxyWindow').getOrSet(win, () => {
            const id = uniqueID();
            const serializedWindow = getSerializedWindow(id, realWin, { send });
            const proxyWindow = new ProxyWindow(serializedWindow, realWin, { send });

            return globalStore('idToProxyWindow').set(id, proxyWindow);
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
