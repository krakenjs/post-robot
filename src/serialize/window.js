/* @flow */

import { isSameDomain, isWindowClosed, type CrossDomainWindowType, closeWindow,
    type DomainMatcher, getOpener, WINDOW_TYPE, isWindow, assertSameDomain, getFrameForWindow } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { uniqueID, memoizePromise, noop, submitForm } from 'belter/src';
import { serializeType, type CustomSerializedType } from 'universal-serialize/src';

import { SERIALIZATION_TYPE, METHOD } from '../conf';
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

type SetLocationOptions = {|
    method? : $Values<typeof METHOD>,
    body? : {|
        [string] : string | boolean
    |}
|};

type SerializedWindowType = {|
    id : string,
    getType : () => ZalgoPromise<$Values<typeof WINDOW_TYPE>>,
    close : () => ZalgoPromise<void>,
    focus : () => ZalgoPromise<void>,
    isClosed : () => ZalgoPromise<boolean>,
    setLocation : (url : string, opts? : SetLocationOptions) => ZalgoPromise<void>,
    getName : () => ZalgoPromise<?string>,
    setName : (string) => ZalgoPromise<void>,
    getInstanceID : () => ZalgoPromise<string>
|};

function getSerializedWindow(winPromise : ZalgoPromise<CrossDomainWindowType>, { send, id = uniqueID() } : {| send : SendType, id? : string |}) : SerializedWindowType {
    
    let windowNamePromise = winPromise.then(win => {
        if (isSameDomain(win)) {
            return assertSameDomain(win).name;
        }
    });
    
    const windowTypePromise = winPromise.then(window => {
        if (!isWindowClosed(window)) {
            return getOpener(window) ? WINDOW_TYPE.POPUP : WINDOW_TYPE.IFRAME;
        } else {
            throw new Error(`Window is closed, can not determine type`);
        }
    });

    windowNamePromise.catch(noop);
    windowTypePromise.catch(noop);

    const getName = () => winPromise.then(win => {
        if (isWindowClosed(win)) {
            return;
        }

        if (isSameDomain(win)) {
            return assertSameDomain(win).name;
        }

        return windowNamePromise;
    });

    const getDefaultSetLocationOptions = () => {
        // $FlowFixMe
        return {};
    };

    const setLocation = (href : string, opts? : SetLocationOptions = getDefaultSetLocationOptions()) => winPromise.then(win => {
        const domain = `${ window.location.protocol }//${ window.location.host }`;
        const { method = METHOD.GET, body } = opts;

        if (href.indexOf('/') === 0) {
            href = `${ domain }${ href }`;
        } else if (!href.match(/^https?:\/\//) && href.indexOf(domain) !== 0) {
            throw new Error(`Expected url to be http or https url, or absolute path, got ${ JSON.stringify(href) }`);
        }

        if (method === METHOD.POST) {
            return getName().then(name => {
                if (!name) {
                    throw new Error(`Can not post to window without target name`);
                }

                submitForm({
                    url:    href,
                    target: name,
                    method,
                    body
                });
            });
        } else if (method === METHOD.GET) {
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

        } else {
            throw new Error(`Unsupported method: ${ method }`);
        }
    });

    return {
        id,
        getType: () => {
            return windowTypePromise;
        },
        getInstanceID: memoizePromise(() => winPromise.then(win => getWindowInstanceID(win, { send }))),
        close:         () => winPromise.then(closeWindow),
        getName,
        focus:         () => winPromise.then(win => {
            win.focus();
        }),
        isClosed: () => winPromise.then(win => {
            return isWindowClosed(win);
        }),
        setLocation,
        setName: (name) => winPromise.then(win => {
            if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
                linkWindow({ win, name });
            }

            const sameDomain = isSameDomain(win);
            const frame = getFrameForWindow(win);

            if (!sameDomain) {
                throw new Error(`Can not set name for cross-domain window: ${ name }`);
            }

            assertSameDomain(win).name = name;
            if (frame) {
                frame.setAttribute('name', name);
            }

            windowNamePromise = ZalgoPromise.resolve(name);
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

    constructor({ send, win, serializedWindow } : {| win? : CrossDomainWindowType, serializedWindow? : SerializedWindowType, send : SendType |}) {
        this.actualWindowPromise = new ZalgoPromise();
        this.serializedWindow = serializedWindow || getSerializedWindow(this.actualWindowPromise, { send });
        
        globalStore('idToProxyWindow').set(this.getID(), this);
        if (win) {
            this.setWindow(win, { send });
        }
    }

    getID() : string {
        return this.serializedWindow.id;
    }

    getType() : ZalgoPromise<$Values<typeof WINDOW_TYPE>> {
        return this.serializedWindow.getType();
    }

    isPopup() : ZalgoPromise<boolean> {
        return this.getType().then(type => {
            return type === WINDOW_TYPE.POPUP;
        });
    }

    setLocation(href : string, opts? : SetLocationOptions) : ZalgoPromise<ProxyWindow> {
        return this.serializedWindow.setLocation(href, opts).then(() => this);
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
        const isPopupPromise = this.isPopup();
        const getNamePromise = this.getName();

        const reopenPromise = ZalgoPromise.hash({ isPopup: isPopupPromise, name: getNamePromise }).then(({ isPopup, name }) => {
            if (isPopup && name) {
                window.open('', name, 'noopener');
            }
        });
        const focusPromise = this.serializedWindow.focus();

        return ZalgoPromise.all([
            reopenPromise,
            focusPromise
        ]).then(() => this);
    }

    isClosed() : ZalgoPromise<boolean> {
        return this.serializedWindow.isClosed();
    }

    getWindow() : ?CrossDomainWindowType {
        return this.actualWindow;
    }

    setWindow(win : CrossDomainWindowType, { send } : {| send : SendType |}) {
        this.actualWindow = win;
        this.actualWindowPromise.resolve(this.actualWindow);
        this.serializedWindow = getSerializedWindow(this.actualWindowPromise, { send, id: this.getID() });
        windowStore('winToProxyWindow').set(win, this);
    }

    awaitWindow() : ZalgoPromise<CrossDomainWindowType> {
        return this.actualWindowPromise;
    }

    matchWindow(win : CrossDomainWindowType, { send } : {| send : SendType |}) : ZalgoPromise<boolean> {
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
                    this.setWindow(win, { send });
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

    static serialize(win : CrossDomainWindowType | ProxyWindow, { send } : {| send : SendType |}) : SerializedWindowType {
        cleanupProxyWindows();
        return ProxyWindow.toProxyWindow(win, { send }).serialize();
    }

    static deserialize(serializedWindow : SerializedWindowType, { send } : {| send : SendType |}) : ProxyWindow {
        cleanupProxyWindows();
        return globalStore('idToProxyWindow').get(serializedWindow.id) || new ProxyWindow({ serializedWindow, send });
    }

    static isProxyWindow(obj : CrossDomainWindowType | ProxyWindow) : boolean {
        // $FlowFixMe
        return Boolean(obj && !isWindow(obj) && obj.isProxyWindow);
    }

    static toProxyWindow(win : CrossDomainWindowType | ProxyWindow, { send } : {| send : SendType |}) : ProxyWindow {
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

export function serializeWindow(destination : CrossDomainWindowType | ProxyWindow, domain : DomainMatcher, win : CrossDomainWindowType, { send } : {| send : SendType |}) : SerializedWindow {
    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW, ProxyWindow.serialize(win, { send }));
}

export function deserializeWindow(source : CrossDomainWindowType | ProxyWindow, origin : string, win : SerializedWindowType, { send } : {| send : SendType |}) : ProxyWindow {
    return ProxyWindow.deserialize(win, { send });
}
