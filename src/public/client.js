/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getAncestor, isAncestor, isWindowClosed, getDomain, matchDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';

import { CONFIG, CONSTANTS } from '../conf';
import { sendMessage, addResponseListener, deleteResponseListener, markResponseListenerErrored, type ResponseListenerType } from '../drivers';
import { uniqueID, onChildWindowReady, sayHello, isRegex } from '../lib';
import { global } from '../global';

global.requestPromises = global.requestPromises || new WeakMap();

type WindowResolverType = CrossDomainWindowType | string | HTMLIFrameElement;

type RequestOptionsType = {
    window? : ?WindowResolverType,
    domain? : ?(string | Array<string> | RegExp),
    name? : ?string,
    data? : ?Object,
    fireAndForget? : ?boolean,
    timeout? : ?number
};

type ResponseMessageEvent = {
    source : CrossDomainWindowType,
    origin : string,
    data : Object
};

export function request(options : RequestOptionsType) : ZalgoPromise<ResponseMessageEvent> {

    let prom = ZalgoPromise.try(() => {

        if (!options.name) {
            throw new Error('Expected options.name');
        }

        let name = options.name;
        let targetWindow : ?CrossDomainWindowType;
        let domain : string | Array<string> | RegExp;

        if (typeof options.window === 'string') {
            let el = document.getElementById(options.window);

            if (!el) {
                throw new Error(`Expected options.window ${ Object.prototype.toString.call(options.window) } to be a valid element id`);
            }

            if (el.tagName.toLowerCase() !== 'iframe') {
                throw new Error(`Expected options.window ${ Object.prototype.toString.call(options.window) } to be an iframe`);
            }

            // $FlowFixMe
            if (!el.contentWindow) {
                throw new Error('Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.');
            }

            // $FlowFixMe
            targetWindow = el.contentWindow;

        } else if (options.window instanceof HTMLIFrameElement) {

            if (options.window.tagName.toLowerCase() !== 'iframe') {
                throw new Error(`Expected options.window ${ Object.prototype.toString.call(options.window) } to be an iframe`);
            }

            if (options.window && !options.window.contentWindow) {
                throw new Error('Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.');
            }

            if (options.window && options.window.contentWindow) {
                // $FlowFixMe
                targetWindow = options.window.contentWindow;
            }
        } else {
            targetWindow = options.window;
        }

        if (!targetWindow) {
            throw new Error('Expected options.window to be a window object, iframe, or iframe element id.');
        }

        const win = targetWindow;

        domain = options.domain || CONSTANTS.WILDCARD;

        let hash = `${ options.name }_${ uniqueID() }`;

        if (isWindowClosed(win)) {
            throw new Error('Target window is closed');
        }

        let hasResult = false;

        let requestPromises = global.requestPromises.get(win);

        if (!requestPromises) {
            requestPromises = [];
            global.requestPromises.set(win, requestPromises);
        }

        let requestPromise = ZalgoPromise.try(() => {

            if (isAncestor(window, win)) {
                return onChildWindowReady(win, options.timeout || CONFIG.CHILD_WINDOW_TIMEOUT);
            }

        }).then(({ origin } = {}) => {

            if (isRegex(domain) && !origin) {
                return sayHello(win);
            }

        }).then(({ origin } = {}) => {

            if (isRegex(domain)) {
                if (!matchDomain(domain, origin)) {
                    throw new Error(`Remote window domain ${ origin } does not match regex: ${ domain.toString() }`);
                }

                domain = origin;
            }

            if (typeof domain !== 'string' && !Array.isArray(domain)) {
                throw new TypeError(`Expected domain to be a string or array`);
            }

            const actualDomain = domain;

            return new ZalgoPromise((resolve, reject) => {

                let responseListener : ResponseListenerType;

                if (!options.fireAndForget) {
                    responseListener = {
                        name,
                        window: win,
                        domain: actualDomain,
                        respond(err, result) {
                            if (!err) {
                                hasResult = true;
                                requestPromises.splice(requestPromises.indexOf(requestPromise, 1));
                            }

                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        }
                    };

                    addResponseListener(hash, responseListener);
                }

                sendMessage(win, {
                    type:          CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                    hash,
                    name,
                    data:          options.data,
                    fireAndForget: options.fireAndForget
                }, actualDomain).catch(reject);

                if (options.fireAndForget) {
                    return resolve();
                }

                let ackTimeout = CONFIG.ACK_TIMEOUT;
                let resTimeout = options.timeout || CONFIG.RES_TIMEOUT;

                let cycleTime = 100;

                let cycle = () => {

                    if (hasResult) {
                        return;
                    }

                    if (isWindowClosed(win)) {

                        if (!responseListener.ack) {
                            return reject(new Error(`Window closed for ${ name } before ack`));
                        }

                        return reject(new Error(`Window closed for ${ name } before response`));
                    }

                    ackTimeout = Math.max(ackTimeout - cycleTime, 0);
                    if (resTimeout !== -1) {
                        resTimeout = Math.max(resTimeout - cycleTime, 0);
                    }

                    let hasAck = responseListener.ack;

                    if (hasAck) {

                        if (resTimeout === -1) {
                            return;
                        }

                        cycleTime = Math.min(resTimeout, 2000);

                    } else if (ackTimeout === 0) {
                        return reject(new Error(`No ack for postMessage ${ name } in ${ getDomain() } in ${ CONFIG.ACK_TIMEOUT }ms`));

                    } else if (resTimeout === 0) {
                        return reject(new Error(`No response for postMessage ${ name } in ${ getDomain() } in ${ options.timeout || CONFIG.RES_TIMEOUT }ms`));
                    }

                    setTimeout(cycle, cycleTime);
                };

                setTimeout(cycle, cycleTime);
            });
        });

        requestPromise.catch(() => {
            markResponseListenerErrored(hash);
            deleteResponseListener(hash);
        });

        requestPromises.push(requestPromise);

        return requestPromise;
    });

    return prom;
}

export function send(window : WindowResolverType, name : string, data : ?Object, options : ?RequestOptionsType) : ZalgoPromise<ResponseMessageEvent> {

    options = options || {};
    options.window = window;
    options.name = name;
    options.data = data;

    return request(options);
}

export function sendToParent(name : string, data : ?Object, options : ?RequestOptionsType) : ZalgoPromise<ResponseMessageEvent> {

    let win = getAncestor();

    if (!win) {
        return new ZalgoPromise((resolve, reject) => reject(new Error('Window does not have a parent')));
    }

    return send(win, name, data, options);
}

export function client(options : RequestOptionsType = {}) : { send : (string, ?Object) => ZalgoPromise<ResponseMessageEvent> } {

    if (!options.window) {
        throw new Error(`Expected options.window`);
    }

    const win = options.window;

    return {
        send(name : string, data : ?Object) : ZalgoPromise<ResponseMessageEvent> {
            return send(win, name, data, options);
        }
    };
}

global.send = send;
