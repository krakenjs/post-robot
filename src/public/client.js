/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getAncestor, isAncestor, isWindowClosed } from 'cross-domain-utils/src';

import { CONFIG, CONSTANTS } from '../conf';
import { sendMessage, addResponseListener, deleteResponseListener } from '../drivers';
import { type ResponseListenerType } from '../drivers';
import { uniqueID, safeInterval, onWindowReady } from '../lib';
import { global } from '../global';

global.requestPromises = global.requestPromises || new WeakMap();

type RequestOptionsType = {
    window? : ?(any | string | HTMLElement),
    domain? : ?string,
    name? : ?string,
    data? : ?Object,
    fireAndForget? : ?boolean,
    timeout? : ?number
};

type ResponseMessageEvent = {
    source : any,
    origin : string,
    data : Object
};

export function request(options : RequestOptionsType) : ZalgoPromise<ResponseMessageEvent> {

    let prom = ZalgoPromise.try(() => {

        if (!options.name) {
            throw new Error('Expected options.name');
        }

        let name = options.name;
        let win = options.window;
        let domain : string;

        if (typeof win === 'string') {
            let el = document.getElementById(win);

            if (!el) {
                throw new Error(`Expected options.window ${Object.prototype.toString.call(win)} to be a valid element id`);
            }

            if (el.tagName.toLowerCase() !== 'iframe') {
                throw new Error(`Expected options.window ${Object.prototype.toString.call(win)} to be an iframe`);
            }

            if (!el.contentWindow) {
                throw new Error('Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.');
            }

            win = el.contentWindow;

        } else if (win instanceof HTMLElement) {

            if (win.tagName.toLowerCase() !== 'iframe') {
                throw new Error(`Expected options.window ${Object.prototype.toString.call(win)} to be an iframe`);
            }

            if (win && !win.contentWindow) {
                throw new Error('Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.');
            }

            if (win && win.contentWindow) {
                win = win.contentWindow;
            }
        }

        if (!win) {
            throw new Error('Expected options.window to be a window object, iframe, or iframe element id.');
        }

        domain = options.domain || CONSTANTS.WILDCARD;

        let hash = `${options.name}_${uniqueID()}`;

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
                return onWindowReady(win);
            }

        }).then(() => {

            return new ZalgoPromise((resolve, reject) => {

                let responseListener : ResponseListenerType = {
                    name,
                    window: win,
                    domain,
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

                sendMessage(win, {
                    type: CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                    hash,
                    name,
                    data: options.data,
                    fireAndForget: options.fireAndForget
                }, domain).catch(reject);

                if (options.fireAndForget) {
                    return resolve();
                }

                let ackTimeout = CONFIG.ACK_TIMEOUT;
                let resTimeout = options.timeout || CONFIG.RES_TIMEOUT;

                let interval = safeInterval(() => {

                    if (responseListener.ack && hasResult) {
                        return interval.cancel();
                    }

                    if (isWindowClosed(win)) {
                        interval.cancel();

                        if (!responseListener.ack) {
                            return reject(new Error(`Window closed for ${name} before ack`));
                        }

                        return reject(new Error(`Window closed for ${name} before response`));
                    }

                    ackTimeout -= 100;
                    resTimeout -= 100;

                    if (ackTimeout <= 0 && !responseListener.ack) {
                        interval.cancel();
                        return reject(new Error(`No ack for postMessage ${name} in ${CONFIG.ACK_TIMEOUT}ms`));
                    }

                    if (resTimeout <= 0 && !hasResult) {
                        interval.cancel();
                        return reject(new Error(`No response for postMessage ${name} in ${options.timeout || CONFIG.RES_TIMEOUT}ms`));
                    }

                }, 100);
            });
        });

        requestPromise.catch(() => {
            deleteResponseListener(hash);
        });

        requestPromises.push(requestPromise);

        return requestPromise;
    });

    return prom;
}

export function send(window : any, name : string, data : ?Object, options : ?RequestOptionsType) : ZalgoPromise<ResponseMessageEvent> {

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

export function client(options : RequestOptionsType = {}) : ({ send : (name : string, data : ?Object) => ZalgoPromise<ResponseMessageEvent> }) {

    if (!options.window) {
        throw new Error(`Expected options.window`);
    }

    return {
        send(name : string, data : ?Object) : ZalgoPromise<ResponseMessageEvent> {
            return send(options.window, name, data, options);
        }
    };
}
