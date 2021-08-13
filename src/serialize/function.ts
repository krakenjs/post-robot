import type { CrossDomainWindowType, DomainMatcher } from 'cross-domain-utils';
import { matchDomain, getDomain } from 'cross-domain-utils';
import { ZalgoPromise } from 'zalgo-promise';
import { uniqueID, isRegex, arrayFrom } from 'belter';
import type { CustomSerializedType } from 'universal-serialize';
import { serializeType } from 'universal-serialize';

import { MESSAGE_NAME, WILDCARD, SERIALIZATION_TYPE } from '../conf';
import { windowStore, globalStore } from '../global';
import type { OnType, SendType, CancelableType } from '../types';

import { ProxyWindow } from './window';

type StoredMethod = {
    name: string;
    domain: DomainMatcher;
    val: (...args: Array<any>) => any;
    source: CrossDomainWindowType | ProxyWindow;
};

function addMethod(
    id: string,
    val: (...args: Array<any>) => any,
    name: string,
    source: CrossDomainWindowType | ProxyWindow,
    domain: DomainMatcher
) {
    const methodStore = windowStore<Record<string, any>>('methodStore');
    const proxyWindowMethods = globalStore('proxyWindowMethods');

    if (ProxyWindow.isProxyWindow(source)) {
        proxyWindowMethods.set(id, {
            val,
            name,
            domain,
            source
        });
    } else {
        proxyWindowMethods.del(id);
        const methods = methodStore.getOrSet(source, () => ({}));
        methods[id] = {
            domain,
            name,
            val,
            source
        };
    }
}

function lookupMethod(
    source: CrossDomainWindowType,
    id: string
): StoredMethod | null | undefined {
    const methodStore = windowStore<Record<string, any>>('methodStore');
    const proxyWindowMethods = globalStore('proxyWindowMethods');
    const methods = methodStore.getOrSet(source, () => ({}));
    return methods[id] || proxyWindowMethods.get(id);
}

function stringifyArguments(args: ReadonlyArray<unknown> = []): string {
    return arrayFrom(args)
        .map((arg) => {
            if (typeof arg === 'string') {
                return `'${ arg }'`;
            }

            if (arg === undefined) {
                return 'undefined';
            }

            if (arg === null) {
                return 'null';
            }

            if (typeof arg === 'boolean') {
                return arg.toString();
            }

            if (Array.isArray(arg)) {
                return '[ ... ]';
            }

            if (typeof arg === 'object') {
                return '{ ... }';
            }

            if (typeof arg === 'function') {
                return '() => { ... }';
            }

            return `<${ typeof arg }>`;
        })
        .join(', ');
}

function listenForFunctionCalls({
    on,
    send
}: {
    on: OnType;
    send: SendType;
}): CancelableType {
    return globalStore<CancelableType>('builtinListeners').getOrSet('functionCalls', () => {
        return on(
            MESSAGE_NAME.METHOD,
            {
                domain: WILDCARD
            },
            ({
                source,
                origin,
                data
            }: {
                source: CrossDomainWindowType;
                origin: string;
                data: Record<string, any>;
            }) => {
                const { id, name } = data;
                const meth = lookupMethod(source, id);

                if (!meth) {
                    throw new Error(
                        `Could not find method '${ name }' with id: ${
                            data.id
                        } in ${ getDomain(window) }`
                    );
                }

                const { source: methodSource, domain, val } = meth;
                return ZalgoPromise.try(() => {
                    if (!matchDomain(domain, origin)) {
                        throw new Error(
                            `Method '${ data.name }' domain ${ JSON.stringify(
                                isRegex(meth.domain)
                                    ? (meth.domain as RegExp).source
                                    : meth.domain
                            ) } does not match origin ${ origin } in ${ getDomain(
                                window
                            ) }`
                        );
                    }

                    if (ProxyWindow.isProxyWindow(methodSource)) {
                        return methodSource
                            // @ts-ignore
                            .matchWindow(source, {
                                send
                            })
                            .then((match: any) => {
                                if (!match) {
                                    throw new Error(
                                        `Method call '${
                                            data.name
                                        }' failed - proxy window does not match source in ${ getDomain(
                                            window
                                        ) }`
                                    );
                                }
                            });
                    }
                })
                    .then(
                        () => {
                            return val.apply(
                                {
                                    source,
                                    origin
                                },
                                data.args
                            );
                        },
                        (err: any) => {
                            return ZalgoPromise.try(() => {
                                // @ts-ignore val returns any any
                                if (val.onError) {
                                    // @ts-ignore val returns any any
                                    return val.onError(err);
                                }
                            }).then(() => {
                                // @ts-ignore
                                if (err.stack) {
                                    // @ts-ignore
                                    err.stack = `Remote call to ${ name }(${ stringifyArguments(
                                        data.args
                                    // @ts-ignore
                                    ) }) failed\n\n${ err.stack }`;
                                }

                                throw err;
                            });
                        }
                    )
                    .then((result) => {
                        return {
                            result,
                            id,
                            name
                        };
                    });
            }
        );
    });
}

export type SerializedFunction = CustomSerializedType<
    typeof SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION,
    {
        id: string;
        name: string;
    }
>;

type SerializableFunction<T> = {
    (): ZalgoPromise<T> | T;
    __id__?: string;
    __name__?: string;
};
export function serializeFunction<T>(
    destination: CrossDomainWindowType | ProxyWindow,
    domain: DomainMatcher,
    val: SerializableFunction<T>,
    key: string,
    {
        on,
        send
    }: {
        on: OnType;
        send: SendType;
    }
): SerializedFunction {
    listenForFunctionCalls({
        on,
        send
    });
    const id = val.__id__ || uniqueID();
    destination = ProxyWindow.unwrap(destination);
    let name = val.__name__ || val.name || key;

    if (
        typeof name === 'string' &&
        typeof name.indexOf === 'function' &&
        name.indexOf('anonymous::') === 0
    ) {
        name = name.replace('anonymous::', `${ key }::`);
    }

    if (ProxyWindow.isProxyWindow(destination)) {
        addMethod(id, val, name, destination, domain);
        // @ts-ignore
        destination.awaitWindow().then((win) => {
            addMethod(id, val, name, win, domain);
        });
    } else {
        addMethod(id, val, name, destination, domain);
    }

    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, {
        id,
        name
    });
}
export function deserializeFunction<T>(
    source: CrossDomainWindowType | ProxyWindow,
    origin: string,
    {
        id,
        name
    }: {
        id: string;
        name: string;
    },
    {
        send
    }: {
        send: SendType;
    }
): (...args: ReadonlyArray<unknown>) => ZalgoPromise<T> {
    const getDeserializedFunction = (opts: Record<string, any> = {}) => {
        function crossDomainFunctionWrapper<
            X extends unknown
        >(): ZalgoPromise<X> {
            let originalStack: Error | string | undefined;

            if (__DEBUG__) {
                originalStack = new Error(`Original call to ${ name }():`).stack;
            }

            return ProxyWindow.toProxyWindow(source, {
                send
            })
                .awaitWindow()
                .then((win) => {
                    const meth = lookupMethod(win, id);

                    if (meth && meth.val !== crossDomainFunctionWrapper) {
                        return meth.val.apply(
                            {
                                source:window,
                                origin:getDomain()
                            },
                            // @ts-ignore arguments not assignable to any[]
                            arguments
                        );
                    } else {
                        // @ts-ignore
                        const args = Array.prototype.slice.call(arguments);

                        if (opts.fireAndForget) {
                            return send(
                                win,
                                MESSAGE_NAME.METHOD,
                                {
                                    id,
                                    name,
                                    args
                                },
                                {
                                    domain:       origin,
                                    fireAndForget:true
                                }
                            );
                        } else {
                            return send(
                                win,
                                MESSAGE_NAME.METHOD,
                                {
                                    id,
                                    name,
                                    args
                                },
                                {
                                    domain:       origin,
                                    fireAndForget:false
                                }
                            ).then((res) => res.data.result);
                        }
                    }
                })
                .catch((err: any) => {
                    // @ts-ignore
                    if (__DEBUG__ && originalStack && err.stack) {
                        err.stack = `Remote call to ${ name }(${ stringifyArguments(
                        // @ts-ignore
                            arguments
                        // @ts-ignore
                        ) }) failed\n\n${ err.stack }\n\n${ originalStack }`;
                    }

                    throw err;
                });
        }

        crossDomainFunctionWrapper.__name__ = name;
        crossDomainFunctionWrapper.__origin__ = origin;
        crossDomainFunctionWrapper.__source__ = source;
        crossDomainFunctionWrapper.__id__ = id;
        crossDomainFunctionWrapper.origin = origin;
        return crossDomainFunctionWrapper;
    };

    const crossDomainFunctionWrapper = getDeserializedFunction();
    // @ts-ignore
    crossDomainFunctionWrapper.fireAndForget = getDeserializedFunction({
        fireAndForget: true
    });
    return crossDomainFunctionWrapper;
}
