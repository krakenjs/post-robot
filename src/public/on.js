/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { addRequestListener, type RequestListenerType } from '../drivers';
import { WILDCARD } from '../conf';
import type { ServerOptionsType, HandlerType, CancelableType } from '../types';

const getDefaultServerOptions = () : ServerOptionsType => {
    // $FlowFixMe
    return {};
};

export function on(name : string, options : ServerOptionsType | HandlerType, handler : ?HandlerType) : CancelableType {

    if (!name) {
        throw new Error('Expected name');
    }

    options = options || getDefaultServerOptions();
    if (typeof options === 'function') {
        handler = options;
        options = getDefaultServerOptions();
    }

    if (!handler) {
        throw new Error('Expected handler');
    }

    options = options || {};
    options.name = name;
    options.handler = handler || options.handler;

    const win = options.window;
    const domain = options.domain;

    const listenerOptions : RequestListenerType = {
        handler:     options.handler,
        handleError: options.errorHandler || (err => {
            throw err;
        }),
        window: win,
        domain: domain || WILDCARD,
        name
    };

    const requestListener = addRequestListener({ name, win, domain }, listenerOptions);

    return {
        cancel() {
            requestListener.cancel();
        }
    };
}

export function once(name : string, options? : ServerOptionsType | HandlerType, handler? : HandlerType) : ZalgoPromise<{| source : mixed, origin : string, data : Object |}> {
    
    options = options || getDefaultServerOptions();
    if (typeof options === 'function') {
        handler = options;
        options = getDefaultServerOptions();
    }

    const promise = new ZalgoPromise();
    let listener; // eslint-disable-line prefer-const

    options.errorHandler = (err) => {
        listener.cancel();
        promise.reject(err);
    };

    listener = on(name, options, event => {
        listener.cancel();
        promise.resolve(event);
        if (handler) {
            return handler(event);
        }
    });

    promise.cancel = listener.cancel;
    return promise;
}
