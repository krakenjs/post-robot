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
import type { SendType } from '../types';

function cleanupProxyWindows() {
    const idToProxyWindow = globalStore('idToProxyWindow');
    for (const id of idToProxyWindow.keys()) {
        // $FlowFixMe
        if (idToProxyWindow.get(id).shouldClean()) {
            idToProxyWindow.del(id);
        }
    }
}

type SerializedWindowType = {|
    id : string,
    getType : () => ZalgoPromise<$Values<typeof WINDOW_TYPE>>,
    close : () => ZalgoPromise<void>,
    focus : () => ZalgoPromise<void>,
    isClosed : () => ZalgoPromise<boolean>,
    setLocation : (string) => ZalgoPromise<void>,
    getName : () => ZalgoPromise<?string>,
    setName : (string) => ZalgoPromise<void>,
    getInstanceID : () => ZalgoPromise<string>
|};

function getSerializedWindow(winPromise : ZalgoPromise<CrossDomainWindowType>, { send } : { send : SendType }) : SerializedWindowType {
    let windowName;

    const id = uniqueID();
    
    return {
        id,
        getType: () => winPromise.then(win => {
            return getOpener(win) ? WINDOW_TYPE.POPUP : WINDOW_TYPE.IFRAME;
        }),
        getInstanceID: memoizePromise(() => winPromise.then(win => getWindowInstanceID(win, { send }))),
        close:         () => winPromise.then(closeWindow),
        getName:       () => winPromise.then(win => {
            if (isWindowClosed(win)) {
                return;
            }

            return windowName;
        }),
        focus:   () => winPromise.then(win => {
            win.focus();
        }),
        isClosed: () => winPromise.then(win => {
            return isWindowClosed(win);
        }),
        setLocation: (href) => winPromise.then(win => {
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
        setName: (name) => winPromise.then(win => {
            if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
                linkWindow({ win, name });
            }

            const sameDomainWin = assertSameDomain(win);

            sameDomainWin.name = name;

            if (sameDomainWin.frameElement) {
                sameDomainWin.frameElement.setAttribute('name', name);
            }

            windowName = name;
        })
    };
}

export class ProxyWindow {

    id : string
    isProxyWindow : true = true
    serializedWindow : SerializedWindowType
    actualWindow : ?CrossDomainWindowType
    actualWindowPromise : ZalgoPromise<CrossDomainWindowType>
    send : SendType
    name : string

    constructor({ send, win, serializedWindow } : { win? : CrossDomainWindowType, serializedWindow? : SerializedWindowType, send : SendType }) {
        this.actualWindowPromise = new ZalgoPromise();
        this.serializedWindow = serializedWindow || getSerializedWindow(this.actualWindowPromise, { send });
        globalStore('idToProxyWindow').set(this.getID(), this);
        if (win) {
            this.setWindow(win);
        }
    }

    getID() : string {
        return this.serializedWindow.id;
    }

    getType() : ZalgoPromise<$Values<typeof WINDOW_TYPE>> {
        return this.serializedWindow.getType();
    }

    isPopup() : boolean {
        return this.getType() === WINDOW_TYPE.POPUP;
    }

    setLocation(href : string) : ZalgoPromise<ProxyWindow> {
        return this.serializedWindow.setLocation(href).then(() => this);
    }

    getName() : ZalgoPromise<?string> {
        return this.serializedWindow.getName();
    }

    setName(name : string) : ZalgoPromise<ProxyWindow> {
        return this.serializedWindow.setName(name).then(() => this);
    }

    close() : ZalgoPromise<ProxyWindow> {
        return this.serializedWindow.close().then(() => this);
    }

    focus() : ZalgoPromise<ProxyWindow> {
        return ZalgoPromise.all([
            this.isPopup() && this.getName().then(name => {
                if (name) {
                    window.open('', name);
                }
            }),
            this.serializedWindow.focus()
        ]).then(() => this);
    }

    isClosed() : ZalgoPromise<boolean> {
        return this.serializedWindow.isClosed();
    }

    getWindow() : ?CrossDomainWindowType {
        return this.actualWindow;
    }

    setWindow(win : CrossDomainWindowType) {
        this.actualWindow = win;
        this.actualWindowPromise.resolve(this.actualWindow);
        windowStore('winToProxyWindow').set(win, this);
    }

    awaitWindow() : ZalgoPromise<CrossDomainWindowType> {
        return this.actualWindowPromise;
    }

    matchWindow(win : CrossDomainWindowType, { send } : { send : SendType }) : ZalgoPromise<boolean> {
        return ZalgoPromise.try(() => {
            if (this.actualWindow) {
                return win === this.actualWindow;
            }
            
            return ZalgoPromise.hash({
                proxyInstanceID:       this.getInstanceID(),
                knownWindowInstanceID: getWindowInstanceID(win, { send })
            }).then(({ proxyInstanceID, knownWindowInstanceID }) => {
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

    shouldClean() : boolean {
        return Boolean(this.actualWindow && isWindowClosed(this.actualWindow));
    }

    serialize() : SerializedWindowType {
        return this.serializedWindow;
    }

    static unwrap(win : CrossDomainWindowType | ProxyWindow) : CrossDomainWindowType | ProxyWindow {
        return ProxyWindow.isProxyWindow(win)
            // $FlowFixMe
            ? win.unwrap()
            : win;
    }

    static serialize(win : CrossDomainWindowType | ProxyWindow, { send } : { send : SendType }) : SerializedWindowType {
        cleanupProxyWindows();
        return ProxyWindow.toProxyWindow(win, { send }).serialize();
    }

    static deserialize(serializedWindow : SerializedWindowType, { send } : { send : SendType }) : ProxyWindow {
        cleanupProxyWindows();
        return globalStore('idToProxyWindow').get(serializedWindow.id) || new ProxyWindow({ serializedWindow, send });
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
        const actualWindow : CrossDomainWindowType = win;
        
        return windowStore('winToProxyWindow').get(actualWindow) || new ProxyWindow({ win: actualWindow, send });
    }
}

export type SerializedWindow = CustomSerializedType<typeof SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW, SerializedWindowType>;

export function serializeWindow(destination : CrossDomainWindowType | ProxyWindow, domain : DomainMatcher, win : CrossDomainWindowType, { send } : { send : SendType }) : SerializedWindow {
    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW, ProxyWindow.serialize(win, { send }));
}

export function deserializeWindow(source : CrossDomainWindowType | ProxyWindow, origin : string, win : SerializedWindowType, { send } : { send : SendType }) : ProxyWindow {
    return ProxyWindow.deserialize(win, { send });
}
