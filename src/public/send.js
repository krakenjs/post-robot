/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { isAncestor, isWindowClosed, getDomain, matchDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { uniqueID, isRegex, noop } from 'belter/src';


import { CHILD_WINDOW_TIMEOUT, MESSAGE_TYPE, WILDCARD, MESSAGE_NAME, ACK_TIMEOUT, RES_TIMEOUT, ACK_TIMEOUT_KNOWN } from '../conf';
import { sendMessage, addResponseListener, deleteResponseListener, markResponseListenerErrored, type ResponseListenerType } from '../drivers';
import { awaitWindowHello, sayHello, isWindowKnown } from '../lib';
import { windowStore } from '../global';
import type { RequestOptionsType, ResponseMessageEvent } from '../types';

import { on } from './on';

export function send(win : CrossDomainWindowType, name : string, data : ?Object, options? : RequestOptionsType) : ZalgoPromise<ResponseMessageEvent> {
    
    // $FlowFixMe
    options = options || {};
    let domain = options.domain || WILDCARD;
    const responseTimeout = options.timeout || RES_TIMEOUT;
    const childTimeout = options.timeout || CHILD_WINDOW_TIMEOUT;
    const fireAndForget = options.fireAndForget || false;

    const prom = ZalgoPromise.try(() => {
        if (!name) {
            throw new Error('Expected name');
        }

        if (domain) {
            if (typeof domain !== 'string' && !Array.isArray(domain) && !isRegex(domain)) {
                throw new TypeError(`Expected domain to be a string, array, or regex`);
            }
        }

        if (isWindowClosed(win)) {
            throw new Error('Target window is closed');
        }

        const reqPromises = windowStore('requestPromises').getOrSet(win, () => []);

        // $FlowFixMe
        const requestPromise = ZalgoPromise.try(() => {

            if (isAncestor(window, win)) {
                return awaitWindowHello(win, childTimeout);
            } else if (isRegex(domain)) {
                return sayHello(win, { send });
            }

        // $FlowFixMe
        }).then(({ domain: origin } = {}) => {

            if (isRegex(domain)) {
                if (!matchDomain(domain, origin)) {
                    // $FlowFixMe
                    throw new Error(`Remote window domain ${ origin } does not match regex: ${ domain.source }`);
                }
                domain = origin;
            }

            const logName = (name === MESSAGE_NAME.METHOD && data && typeof data.name === 'string') ? `${ data.name }()` : name;

            if (__DEBUG__) {
                console.info('send::req', logName, domain, '\n\n', data); // eslint-disable-line no-console
            }

            let hasResult = false;

            const promise = new ZalgoPromise();
            promise.finally(() => {
                hasResult = true;
                reqPromises.splice(reqPromises.indexOf(requestPromise, 1));
            }).catch(noop);

            const hash = `${ name }_${ uniqueID() }`;

            sendMessage(win, domain, {
                type: MESSAGE_TYPE.REQUEST,
                hash,
                name,
                data,
                fireAndForget
            }, { on, send });

            if (fireAndForget) {
                return promise.resolve();
            }

            promise.catch(() => {
                markResponseListenerErrored(hash);
                deleteResponseListener(hash);
            });

            const responseListener : ResponseListenerType = {
                name,
                win,
                domain,
                promise
            };

            addResponseListener(hash, responseListener);

            const totalAckTimeout = isWindowKnown(win) ? ACK_TIMEOUT_KNOWN : ACK_TIMEOUT;
            const totalResTimeout = responseTimeout;

            let ackTimeout = totalAckTimeout;
            let resTimeout = totalResTimeout;

            let cycleTime = 100;

            const cycle = () => {
                if (hasResult) {
                    return;
                }

                if (isWindowClosed(win)) {
                    if (!responseListener.ack) {
                        return promise.reject(new Error(`Window closed for ${ name } before ack`));
                    } else {
                        return promise.reject(new Error(`Window closed for ${ name } before response`));
                    }
                }

                ackTimeout = Math.max(ackTimeout - cycleTime, 0);
                if (resTimeout !== -1) {
                    resTimeout = Math.max(resTimeout - cycleTime, 0);
                }

                const hasAck = responseListener.ack;

                if (hasAck) {
                    if (resTimeout === -1) {
                        return;
                    }

                    cycleTime = Math.min(resTimeout, 2000);

                } else if (ackTimeout === 0) {
                    return promise.reject(new Error(`No ack for postMessage ${ name } in ${ getDomain() } in ${ totalAckTimeout }ms`));

                } else if (resTimeout === 0) {
                    return promise.reject(new Error(`No response for postMessage ${ name } in ${ getDomain() } in ${ totalResTimeout }ms`));
                }

                setTimeout(cycle, cycleTime);
            };

            setTimeout(cycle, cycleTime);

            return promise;
        });

        reqPromises.push(requestPromise);
        return requestPromise;
    });

    return prom;
}
