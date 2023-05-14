import type { CrossDomainWindowType } from "@krakenjs/cross-domain-utils/dist/esm";
import { getAncestor } from "@krakenjs/cross-domain-utils/dist/esm";
import { uniqueID } from "@krakenjs/belter/dist/esm";

import { MESSAGE_NAME, WILDCARD } from "../conf";
import { windowStore, globalStore, getGlobal } from "../global";
import type { OnType, SendType, CancelableType } from "../types";
import { promiseTimeout } from "../promiseUtils";

function getInstanceID(): string {
  return globalStore<string>("instance").getOrSet("instanceID", uniqueID);
}

type HelloPromise = Promise<{
  domain: string;
}>;

function getHelloPromise(win: CrossDomainWindowType): HelloPromise {
  const helloPromises = windowStore<HelloPromise>("helloPromises");
  return helloPromises.getOrSet(win, () => Promise.reject("not found"));
}

function setHelloPromise(
  win: CrossDomainWindowType,
  promise: Promise<unknown>
): HelloPromise {
  const helloPromises = windowStore<HelloPromise>("helloPromises");
  // @ts-expect-error - no args
  return helloPromises.set(win, promise);
}

function resolveHelloPromise(
  win: CrossDomainWindowType,
  { domain }: { domain: string }
): HelloPromise {
  const helloPromises = windowStore<HelloPromise>("helloPromises");
  let existingPromise = helloPromises.get(win);
  if (existingPromise) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    existingPromise = Promise.resolve({ domain });
    void helloPromises.set(win, existingPromise);
    // existingPromise.resolve({
    //   domain,
    // });
  }

  const newPromise = Promise.resolve({
    domain,
  });
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  helloPromises.set(win, newPromise);
  return newPromise;
}

function listenForHello({ on }: { on: OnType }): CancelableType {
  return on(
    MESSAGE_NAME.HELLO,
    {
      domain: WILDCARD,
    },
    ({ source, origin }) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      resolveHelloPromise(source, {
        domain: origin,
      });
      return {
        instanceID: getInstanceID(),
      };
    }
  );
}

export function sayHello(
  win: CrossDomainWindowType,
  {
    send,
  }: {
    send: SendType;
  }
): Promise<{
  win: CrossDomainWindowType;
  domain: string;
  instanceID: string;
}> {
  return send(
    win,
    MESSAGE_NAME.HELLO,
    {
      instanceID: getInstanceID(),
    },
    {
      domain: WILDCARD,
      timeout: -1,
    }
  ).then(({ origin, data: { instanceID } }) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    resolveHelloPromise(win, {
      domain: origin,
    });
    return {
      win,
      domain: origin,
      instanceID,
    };
  });
}

type WindowInstanceID = Promise<string>;

export function getWindowInstanceID(
  win: CrossDomainWindowType,
  {
    send,
  }: {
    send: SendType;
  }
): WindowInstanceID {
  return windowStore<WindowInstanceID>("windowInstanceIDPromises").getOrSet(
    win,
    () => {
      return sayHello(win, {
        send,
      }).then(({ instanceID }) => instanceID);
    }
  );
}

export function initHello({
  on,
  send,
}: {
  on: OnType;
  send: SendType;
}): CancelableType {
  return globalStore<CancelableType>("builtinListeners").getOrSet(
    "helloListener",
    () => {
      const listener = listenForHello({
        on,
      });

      const parent = getAncestor();
      if (parent) {
        sayHello(parent, {
          send,
        }).catch((err) => {
          // @ts-expect-error TODO: remove this when belter issue is resolved
          if (__TEST__ && getGlobal(parent)) {
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw err;
          }
        });
      }

      return listener;
    }
  );
}

export function awaitWindowHello(
  win: CrossDomainWindowType,
  timeout = 5000,
  name = "Window"
): Promise<{
  domain?: string;
}> {
  let promise = getHelloPromise(win);

  if (timeout !== -1) {
    const error = new Error(`${name} did not load after ${timeout}ms`);
    promise = promiseTimeout(promise, timeout);
    // .catch(() => {
    //   throw error;
    // });

    void setHelloPromise(win, promise);

    // promise = promise.timeout(
    //   timeout,
    //   error
    // );
  }

  return promise;
}
