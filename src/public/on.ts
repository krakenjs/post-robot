import { ZalgoPromise } from 'zalgo-promise';

import type { RequestListenerType } from '../drivers';
import { addRequestListener } from '../drivers';
import { WILDCARD } from '../conf';
import type { ServerOptionsType, HandlerType, CancelableType } from '../types';

const getDefaultServerOptions = (): ServerOptionsType => {
    return {};
};

export function on(
    name: string,
    options: ServerOptionsType | HandlerType,
    handler?: HandlerType | null | undefined
): CancelableType {
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
    const listenerOptions: RequestListenerType = {
        handler:    options.handler,
        handleError:options.errorHandler ||
            ((err) => {
                throw err;
            }),
        window:win,
        domain:domain || WILDCARD,
        name
    };
    const requestListener = addRequestListener(
        {
            name,
            win,
            domain
        },
        listenerOptions
    );
    return {
        cancel() {
            requestListener.cancel();
        }
    };
}
type CancelableZalgoPromise<T> = ZalgoPromise<T> & {
    cancel: () => void;
};
export function once(
    name: string,
    options?: ServerOptionsType | HandlerType,
    handler?: HandlerType
): CancelableZalgoPromise<{
    source: unknown;
    origin: string;
    data: Record<string, any>;
}> {
    options = options || getDefaultServerOptions();

    if (typeof options === 'function') {
        handler = options;
        options = getDefaultServerOptions();
    }

    const promise = new ZalgoPromise();
    let listener: CancelableType; // eslint-disable-line prefer-const

    options.errorHandler = (err) => {
        listener.cancel();
        promise.reject(err);
    };

    listener = on(name, options, (event) => {
        listener.cancel();
        promise.resolve(event);

        if (handler) {
            return handler(event);
        }
    });
    // @ts-ignore
    promise.cancel = listener.cancel;
    // @ts-ignore
    return promise;
}
