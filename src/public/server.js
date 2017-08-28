/* @flow */

import { isWindowClosed } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { once as onceFunction, safeInterval } from '../lib';
import { addRequestListener } from '../drivers';
import { type RequestListenerType } from '../drivers';
import { CONSTANTS } from '../conf';

type ErrorHandlerType = (err : mixed) => void;
type HandlerType = ({ source : any, origin : string, data : Object }) => (void | mixed | ZalgoPromise<mixed>);

type ServerOptionsType = {
    handler? : ?HandlerType,
    errorHandler? : ?ErrorHandlerType,
    window? : ?any,
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

    let listenerOptions : RequestListenerType = {
        handler: options.handler,
        handleError: options.errorHandler || (err => {
            throw err;
        }),
        window: options.window,
        domain: options.domain || CONSTANTS.WILDCARD,
        name: options.name
    };

    let requestListener = addRequestListener({ name: listenerOptions.name, win: listenerOptions.window, domain: listenerOptions.domain }, listenerOptions);

    if (options.once) {
        let handler = listenerOptions.handler;
        listenerOptions.handler = onceFunction(function() : mixed | ZalgoPromise<mixed> {
            requestListener.cancel();
            return handler.apply(this, arguments);
        });
    }

    if (listenerOptions.window && options.errorOnClose) {
        let interval = safeInterval(() => {
            if (isWindowClosed(listenerOptions.window)) {
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

export function once(name : string, options : ServerOptionsType, handler : HandlerType) : ZalgoPromise<{ source : mixed, origin : string, data : Object }> {

    if (typeof options === 'function') {
        handler = options;
        options = {};
    }

    options = options || {};

    options.name = name;
    options.handler = handler || options.handler;
    options.once = true;

    let prom = new ZalgoPromise((resolve, reject) => {
        options.handler = options.handler || (event => resolve(event));
        options.errorHandler = options.errorHandler || reject;
    });

    let myListener = listen(options);
    prom.cancel = myListener.cancel;

    return prom;
}

export function listener(options : ServerOptionsType = {}) : { on : (name : string, handler : HandlerType) => { cancel : () => void } } {

    return {
        on(name : string, handler : HandlerType) : { cancel : () => void } {
            return on(name, options, handler);
        }
    };
}
