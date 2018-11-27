/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { getAncestor, isAncestor, isWindowClosed, getDomain, matchDomain, type CrossDomainWindowType, type DomainMatcher } from 'cross-domain-utils/src';
import { uniqueID, isRegex } from 'belter/src';


import { CONFIG, MESSAGE_TYPE, WILDCARD } from '../conf';
import { sendMessage, addResponseListener, deleteResponseListener, markResponseListenerErrored, type ResponseListenerType } from '../drivers';
import { awaitWindowHello, sayHello, isWindowKnown } from '../lib';
import { global, windowStore } from '../global';

export let requestPromises = windowStore('requestPromises');

type WindowResolverType = CrossDomainWindowType | string | HTMLIFrameElement;

type RequestOptionsType = {
    window? : ?WindowResolverType,
    domain? : ?DomainMatcher,
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
        let domain : DomainMatcher;

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

        domain = options.domain || WILDCARD;

        let hash = `${ options.name }_${ uniqueID() }`;

        if (isWindowClosed(win)) {
            throw new Error('Target window is closed');
        }

        let hasResult = false;

        let reqPromises = requestPromises.getOrSet(win, () => []);

        let requestPromise = ZalgoPromise.try(() => {

            if (isAncestor(window, win)) {
                return awaitWindowHello(win, options.timeout || CONFIG.CHILD_WINDOW_TIMEOUT);
            }

        }).then(({ domain: origin } = {}) => {

            if (isRegex(domain) && !origin) {
                return sayHello(win);
            }

        }).then(({ domain: origin } = {}) => {

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
                                reqPromises.splice(reqPromises.indexOf(requestPromise, 1));
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

                sendMessage(win, actualDomain, {
                    type:          MESSAGE_TYPE.REQUEST,
                    hash,
                    name,
                    data:          options.data,
                    fireAndForget: Boolean(options.fireAndForget)
                }).catch(reject);

                if (options.fireAndForget) {
                    return resolve();
                }

                let totalAckTimeout = isWindowKnown(win) ? CONFIG.ACK_TIMEOUT_KNOWN : CONFIG.ACK_TIMEOUT;
                let totalResTimeout = options.timeout || CONFIG.RES_TIMEOUT;

                let ackTimeout = totalAckTimeout;
                let resTimeout = totalResTimeout;

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
                        return reject(new Error(`No ack for postMessage ${ name } in ${ getDomain() } in ${ totalAckTimeout }ms`));

                    } else if (resTimeout === 0) {
                        return reject(new Error(`No response for postMessage ${ name } in ${ getDomain() } in ${ totalResTimeout }ms`));
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

        reqPromises.push(requestPromise);

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
