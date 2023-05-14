import type {
  CrossDomainWindowType,
  DomainMatcher,
} from "@krakenjs/cross-domain-utils/dist/esm";
import { matchDomain } from "@krakenjs/cross-domain-utils/dist/esm";
import { isRegex, getOrSet, noop } from "@krakenjs/belter/dist/esm";

import type { WildCard } from "../global";
import { getWildcard, globalStore, windowStore } from "../global";
import { WILDCARD } from "../conf";
import { ProxyWindow } from "../serialize/window";
import type { CancelableType } from "../types";

export function resetListeners() {
  const responseListeners = globalStore("responseListeners");
  const erroredResponseListeners = globalStore("erroredResponseListeners");
  responseListeners.reset();
  erroredResponseListeners.reset();
}

const __DOMAIN_REGEX__ = "__domain_regex__" as const;

export type RequestListenerType = {
  handler: (arg0: {
    source: CrossDomainWindowType;
    origin: string;
    data: unknown;
  }) => Promise<unknown>;
  handleError: (err: unknown) => void;
};

export type ResponseListenerType = {
  name: string;
  win: CrossDomainWindowType;
  domain: DomainMatcher;
  promise: Promise<any>;
  ack?: boolean | null | undefined;
  cancelled?: boolean | null | undefined;
};

export function addResponseListener(
  hash: string,
  listener: ResponseListenerType
) {
  const responseListeners = globalStore("responseListeners");
  responseListeners.set(hash, listener);
}

export function getResponseListener(
  hash: string
): ResponseListenerType | null | undefined {
  const responseListeners =
    globalStore<ResponseListenerType>("responseListeners");
  return responseListeners.get(hash);
}

export function deleteResponseListener(hash: string) {
  const responseListeners =
    globalStore<ResponseListenerType>("responseListeners");
  responseListeners.del(hash);
}

export function cancelResponseListeners() {
  const responseListeners =
    globalStore<ResponseListenerType>("responseListeners");

  for (const hash of responseListeners.keys()) {
    const listener = responseListeners.get(hash);

    if (listener) {
      listener.cancelled = true;
    }

    responseListeners.del(hash);
  }
}

export function markResponseListenerErrored(hash: string) {
  const erroredResponseListeners = globalStore("erroredResponseListeners");
  erroredResponseListeners.set(hash, true);
}

export function isResponseListenerErrored(hash: string): boolean {
  const erroredResponseListeners = globalStore("erroredResponseListeners");
  return erroredResponseListeners.has(hash);
}

type WinNameDomainRegexListener = {
  regex: DomainMatcher;
  listener: RequestListenerType;
};

type RequestListenerStore = Record<string, RequestListenerType> & {
  __domain_regex__: WinNameDomainRegexListener[];
};

export function getRequestListener({
  name,
  win,
  domain,
}: {
  name: string;
  win: CrossDomainWindowType | WildCard | null | undefined;
  domain: string | RegExp | null | undefined;
}): RequestListenerType | null | undefined {
  const requestListeners =
    windowStore<Record<string, RequestListenerStore>>("requestListeners");

  if (win === WILDCARD) {
    win = null;
  }

  if (domain === WILDCARD) {
    domain = null;
  }

  if (!name) {
    throw new Error(`Name required to get request listener`);
  }

  for (const winQualifier of [win, getWildcard()]) {
    if (!winQualifier) {
      continue;
    }

    const nameListeners = requestListeners.get(winQualifier);

    if (!nameListeners) {
      continue;
    }

    const domainListeners = nameListeners[name];

    if (!domainListeners) {
      continue;
    }

    if (domain && typeof domain === "string") {
      if (domainListeners[domain]) {
        return domainListeners[domain];
      }

      if (domainListeners[__DOMAIN_REGEX__]) {
        for (const { regex, listener } of domainListeners[__DOMAIN_REGEX__]) {
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

// eslint-disable-next-line complexity
export function addRequestListener(
  {
    name,
    win: winCandidate,
    domain,
  }: {
    name: string;
    win: (CrossDomainWindowType | WildCard | ProxyWindow) | null | undefined;
    domain: DomainMatcher | null | undefined;
  },
  listener: RequestListenerType
): {
  cancel: () => void;
} {
  const requestListeners =
    windowStore<Record<string, RequestListenerType>>("requestListeners");

  if (!name || typeof name !== "string") {
    throw new Error(`Name required to add request listener`);
  }

  if (
    winCandidate &&
    winCandidate !== WILDCARD &&
    // @ts-expect-error TS still thinks winCandidate can be WildCard type here, but conditional above should prevent that
    ProxyWindow.isProxyWindow(winCandidate)
  ) {
    // @ts-expect-error again, TS doesnt understand type narrowing above, winCandidate should always be ProxyWindow type here
    const proxyWin: ProxyWindow = winCandidate;

    const requestListenerPromise = proxyWin.awaitWindow().then((actualWin) => {
      return addRequestListener(
        {
          name,
          win: actualWin,
          domain,
        },
        listener
      );
    });

    return {
      cancel: () => {
        requestListenerPromise.then(
          // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
          (requestListener) => requestListener.cancel(),
          noop
        );
      },
    };
  }

  let win: (CrossDomainWindowType | WildCard) | null | undefined = winCandidate;

  if (Array.isArray(win)) {
    const listenersCollection: CancelableType[] = [];

    for (const item of win) {
      listenersCollection.push(
        addRequestListener(
          {
            name,
            domain,
            win: item,
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
      },
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
            domain: item,
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
      },
    };
  }

  const existingListener = getRequestListener({
    name,
    win,
    // @ts-expect-error TS doesnt understand this type narrowing- we've already checked if 'domain' is an array so it should be fine here
    domain,
  });

  if (!win || win === WILDCARD) {
    win = getWildcard();
  }

  domain = domain || WILDCARD;
  const strDomain = domain.toString();

  if (existingListener) {
    if (win && domain) {
      throw new Error(
        `Request listener already exists for ${name} on domain ${domain.toString()} for ${
          win === getWildcard() ? "wildcard" : "specified"
        } window`
      );
    } else if (win) {
      throw new Error(
        `Request listener already exists for ${name} for ${
          win === getWildcard() ? "wildcard" : "specified"
        } window`
      );
    } else if (domain) {
      throw new Error(
        `Request listener already exists for ${name} on domain ${domain.toString()}`
      );
    } else {
      throw new Error(`Request listener already exists for ${name}`);
    }
  }

  const winNameListeners = requestListeners.getOrSet(win, () => ({}));
  const winNameDomainListeners: Record<string, RequestListenerType> = getOrSet(
    winNameListeners,
    name,
    () => ({})
  );

  let winNameDomainRegexListeners: WinNameDomainRegexListener[];
  let winNameDomainRegexListener: WinNameDomainRegexListener | undefined;

  if (isRegex(domain)) {
    winNameDomainRegexListeners = getOrSet(
      winNameDomainListeners,
      __DOMAIN_REGEX__,
      () => []
    );
    winNameDomainRegexListener = {
      regex: domain,
      listener,
    };
    winNameDomainRegexListeners.push(winNameDomainRegexListener);
  } else {
    winNameDomainListeners[strDomain] = listener;
  }

  return {
    cancel() {
      delete winNameDomainListeners[strDomain];

      if (winNameDomainRegexListener) {
        winNameDomainRegexListeners.splice(
          winNameDomainRegexListeners.indexOf(winNameDomainRegexListener, 1)
        );

        if (!winNameDomainRegexListeners.length) {
          delete winNameDomainListeners[__DOMAIN_REGEX__];
        }
      }

      if (!Object.keys(winNameDomainListeners).length) {
        delete winNameListeners[name];
      }

      if (win && !Object.keys(winNameListeners).length) {
        requestListeners.del(win);
      }
    },
  };
}
