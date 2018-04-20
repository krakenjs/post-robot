/* @flow */

import { isWindowClosed, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { once as onceFunction, safeInterval } from '../lib';
import { addRequestListener, type RequestListenerType } from '../drivers';
import { CONSTANTS } from '../conf';
import { global } from '../global';

type ErrorHandlerType = (err : mixed) => void;
type HandlerType = ({ source : CrossDomainWindowType, origin : string, data : Object }) => (void | mixed | ZalgoPromise<mixed>);

type ServerOptionsType = {
    handler? : ?HandlerType,
    errorHandler? : ?ErrorHandlerType,
    window? : CrossDomainWindowType,
    name? : ?string,
    domain? : ?(string | RegExp | Array<string>),
    once? : ?boolean,
    errorOnClose? : ?boolean
};

export function listen(options : ServerOptionsType) : { cancel : () => void } {

    if (!options.name) {
        throw new Error('Expected options.name');
    }

    if (!options.handler) {
        throw new Error('Expected options.handler');
    }

    const name = options.name;
    const win = options.window;
    const domain = options.domain;

    let listenerOptions : RequestListenerType = {
        handler:     options.handler,
        handleError: options.errorHandler || (err => {
            throw err;
        }),
        window: win,
        domain: domain || CONSTANTS.WILDCARD,
        name
    };

    let requestListener = addRequestListener({ name, win, domain }, listenerOptions);

    if (options.once) {
        let handler = listenerOptions.handler;
        listenerOptions.handler = onceFunction(function listenOnce() : mixed | ZalgoPromise<mixed> {
            requestListener.cancel();
            return handler.apply(this, arguments);
        });
    }

    if (listenerOptions.window && options.errorOnClose) {
        let interval = safeInterval(() => {
            if (win && typeof win === 'object' && isWindowClosed(win)) {
                interval.cancel();
                listenerOptions.handleError(new Error('Post message target window is closed'));
            }
        }, 50);
    }

    return {
        cancel() {
            requestListener.cancel();
        }
    };
}

export function on(name : string, options : ServerOptionsType | HandlerType, handler : ?HandlerType) : { cancel : () => void } {

    if (typeof options === 'function') {
        handler = options;
        options = {};
    }

    options = options || {};

    options.name = name;
    options.handler = handler || options.handler;

    return listen(options);
}

export function once(name : string, options : ?(ServerOptionsType | HandlerType) = {}, handler : ?HandlerType) : ZalgoPromise<{ source : mixed, origin : string, data : Object }> {

    if (typeof options === 'function') {
        handler = options;
        options = {};
    }

    options = options || {};
    handler = handler || options.handler;
    let errorHandler = options.errorHandler;

    let promise = new ZalgoPromise((resolve, reject) => {

        options = options || {};

        options.name = name;
        options.once = true;

        options.handler = (event) => {
            resolve(event);
            if (handler) {
                return handler(event);
            }
        };

        options.errorHandler = (err) => {
            reject(err);
            if (errorHandler) {
                return errorHandler(err);
            }
        };
    });

    let onceListener = listen(options);
    promise.cancel = onceListener.cancel;

    return promise;
}

export function listener(options : ServerOptionsType = {}) : { on : (name : string, handler : HandlerType) => { cancel : () => void } } {

    return {
        on(name : string, handler : HandlerType) : { cancel : () => void } {
            return on(name, options, handler);
        }
    };
}

global.on = on;
