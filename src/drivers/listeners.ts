import type { ZalgoPromise } from 'zalgo-promise';
import type { CrossDomainWindowType, DomainMatcher } from 'cross-domain-utils';
import { matchDomain } from 'cross-domain-utils';
import { isRegex, getOrSet, CancelableType } from 'belter';

import type { WildCard } from '../global';
import { getWildcard, globalStore, windowStore } from '../global';
import { WILDCARD } from '../conf';

export function resetListeners(): void {
    const responseListeners = globalStore('responseListeners');
    const erroredResponseListeners = globalStore('erroredResponseListeners');
    responseListeners.reset();
    erroredResponseListeners.reset();
}
const __DOMAIN_REGEX__ = '__domain_regex__';
export type RequestListenerType = {
    handler: (arg0: {
        source: CrossDomainWindowType;
        origin: string;
        data: unknown;
    }) => unknown | ZalgoPromise<unknown>;
    handleError: (err: unknown) => void;
    window: CrossDomainWindowType | null | undefined;
    name: string;
    domain: DomainMatcher;
};
export type ResponseListenerType = {
    name: string;
    win: CrossDomainWindowType;
    domain: DomainMatcher;
    promise: ZalgoPromise<any>;
    ack?: boolean | null | undefined;
    cancelled?: boolean | null | undefined;
};
export function addResponseListener(
    hash: string,
    listener: ResponseListenerType
): void {
    const responseListeners = globalStore('responseListeners');
    responseListeners.set(hash, listener);
}
export function getResponseListener(
    hash: string
): ResponseListenerType | null | undefined {
    const responseListeners = globalStore('responseListeners');
    // @ts-ignore responseListeners is unknown
    return responseListeners.get(hash);
}
export function deleteResponseListener(hash: string): void {
    const responseListeners = globalStore('responseListeners');
    responseListeners.del(hash);
}
export function cancelResponseListeners(): void {
    const responseListeners = globalStore('responseListeners');

    for (const hash of responseListeners.keys()) {
        const listener = responseListeners.get(hash);

        if (listener) {
            // @ts-ignore
            listener.cancelled = true;
        }

        responseListeners.del(hash);
    }
}
export function markResponseListenerErrored(hash: string): void {
    const erroredResponseListeners = globalStore('erroredResponseListeners');
    erroredResponseListeners.set(hash, true);
}
export function isResponseListenerErrored(hash: string): boolean {
    const erroredResponseListeners = globalStore('erroredResponseListeners');
    return erroredResponseListeners.has(hash);
}
export function getRequestListener({
    name,
    win,
    domain
}: {
    name: string;
    win: (CrossDomainWindowType | WildCard) | null | undefined;
    domain: (string | RegExp) | null | undefined;
}): RequestListenerType | null | undefined {
    const requestListeners = windowStore('requestListeners');

    if (win === WILDCARD) {
        win = null;
    }

    if (domain === WILDCARD) {
        domain = null;
    }

    if (!name) {
        throw new Error(`Name required to get request listener`);
    }

    for (const winQualifier of [ win, getWildcard() ]) {
        if (!winQualifier) {
            continue;
        }

        const nameListeners = requestListeners.get(winQualifier);

        if (!nameListeners) {
            continue;
        }

        // @ts-ignore what is nameListeners type
        const domainListeners = nameListeners[name];

        if (!domainListeners) {
            continue;
        }

        if (domain && typeof domain === 'string') {
            if (domainListeners[domain]) {
                return domainListeners[domain];
            }

            if (domainListeners[__DOMAIN_REGEX__]) {
                for (const { regex, listener } of domainListeners[
                    __DOMAIN_REGEX__
                ]) {
                    if (matchDomain(regex, domain)) {
                        return listener;
                    }
                }
            }
        }

        if (domainListeners[WILDCARD]) {
            return domainListeners[WILDCARD];
        }
    }
}
export function addRequestListener(
    {
        name,
        win,
        domain
    }: {
        name: string;
        win: (CrossDomainWindowType | WildCard) | null | undefined;
        domain: DomainMatcher | null | undefined;
    },
    listener: RequestListenerType
): {
    cancel: () => void;
} {
    const requestListeners = windowStore('requestListeners');

    if (!name || typeof name !== 'string') {
        throw new Error(`Name required to add request listener`);
    }

    if (Array.isArray(win)) {
        const listenersCollection: CancelableType[] = [];

        for (const item of win) {
            listenersCollection.push(
                addRequestListener(
                    {
                        name,
                        domain,
                        win: item
                    },
                    listener
                )
            );
        }

        return {
            cancel() {
                for (const cancelListener of listenersCollection) {
                    cancelListener.cancel();
                }
            }
        };
    }

    if (Array.isArray(domain)) {
        const listenersCollection: CancelableType[] = [];

        for (const item of domain) {
            listenersCollection.push(
                addRequestListener(
                    {
                        name,
                        win,
                        domain: item
                    },
                    listener
                )
            );
        }

        return {
            cancel() {
                for (const cancelListener of listenersCollection) {
                    cancelListener.cancel();
                }
            }
        };
    }

    const existingListener = getRequestListener({
        name,
        win,
        // @ts-ignore domain is unknown
        domain
    });

    if (!win || win === WILDCARD) {
        win = getWildcard();
    }

    domain = domain || WILDCARD;

    if (existingListener) {
        if (win && domain) {
            throw new Error(
                `Request listener already exists for ${ name } on domain ${ domain.toString() } for ${
                    win === getWildcard() ? 'wildcard' : 'specified'
                } window`
            );
        } else if (win) {
            throw new Error(
                `Request listener already exists for ${ name } for ${
                    win === getWildcard() ? 'wildcard' : 'specified'
                } window`
            );
        } else if (domain) {
            throw new Error(
                `Request listener already exists for ${ name } on domain ${ domain.toString() }`
            );
        } else {
            throw new Error(`Request listener already exists for ${ name }`);
        }
    }

    const nameListeners = requestListeners.getOrSet(win, () => ({})) as Record<
        string,
        any
    >;
    const domainListeners = getOrSet(nameListeners, name, () => ({}));
    const strDomain = domain.toString();
    let regexListeners: { regex: RegExp; listener: any }[];
    let regexListener: { regex: RegExp; listener: any };

    if (isRegex(domain)) {
        regexListeners = getOrSet(domainListeners, __DOMAIN_REGEX__, () => []);
        regexListener = {
            // @ts-ignore wasn't narrowed
            regex: domain,
            listener
        };
        // @ts-ignore wasn't narrowed
        regexListeners.push(regexListener);
    } else {
        // @ts-ignore
        domainListeners[strDomain] = listener;
    }

    return {
        cancel() {
            // @ts-ignore
            delete domainListeners[strDomain];

            if (regexListener) {
                regexListeners.splice(regexListeners.indexOf(regexListener, 1));

                if (!regexListeners.length) {
                    // @ts-ignore
                    delete domainListeners[__DOMAIN_REGEX__];
                }
            }

            if (!Object.keys(domainListeners).length) {
                delete nameListeners[name];
            }

            if (win && !Object.keys(nameListeners).length) {
                requestListeners.del(win);
            }
        }
    };
}
