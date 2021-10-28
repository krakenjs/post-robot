/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { addRequestListener } from '../drivers';
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

    const winOrProxyWin = options.window;
    const domain = options.domain || WILDCARD;

    const successHandler = handler || options.handler;
    const errorHandler = options.errorHandler || (err => {
        throw err;
    });

    const requestListener = addRequestListener({ name, win: winOrProxyWin, domain }, {
        handler:     successHandler,
        handleError: errorHandler
    });

    return {
        cancel() {
            requestListener.cancel();
        }
    };
}

type CancelableZalgoPromise<T> = ZalgoPromise<T> & {|
    cancel : () => void
|};

export function once(name : string, options? : ServerOptionsType | HandlerType, handler? : HandlerType) : CancelableZalgoPromise<{| source : mixed, origin : string, data : Object |}> {
    
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

    // $FlowFixMe
    promise.cancel = listener.cancel;

    // $FlowFixMe
    return promise;
}
