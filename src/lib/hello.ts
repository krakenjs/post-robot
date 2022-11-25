import type { CrossDomainWindowType } from "@krakenjs/cross-domain-utils/dist/esm";
import { getAncestor } from "@krakenjs/cross-domain-utils/dist/esm";
import { ZalgoPromise } from "@krakenjs/zalgo-promise";
import { uniqueID } from "@krakenjs/belter/dist/esm";

import { MESSAGE_NAME, WILDCARD } from "../conf";
import { windowStore, globalStore, getGlobal } from "../global";
import type { OnType, SendType, CancelableType } from "../types";

function getInstanceID(): string {
  return globalStore("instance").getOrSet("instanceID", uniqueID);
}

function getHelloPromise(win: CrossDomainWindowType): ZalgoPromise<{
  domain: string;
}> {
  const helloPromises = windowStore("helloPromises");
  return helloPromises.getOrSet(win, () => new ZalgoPromise());
}

function resolveHelloPromise(
  win: CrossDomainWindowType,
  { domain }
): ZalgoPromise<{
  domain: string;
}> {
  const helloPromises = windowStore("helloPromises");
  const existingPromise = helloPromises.get(win);

  if (existingPromise) {
    existingPromise.resolve({
      domain,
    });
  }

  const newPromise = ZalgoPromise.resolve({
    domain,
  });
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
): ZalgoPromise<{
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

export function getWindowInstanceID(
  win: CrossDomainWindowType,
  {
    send,
  }: {
    send: SendType;
  }
): ZalgoPromise<string> {
  return windowStore("windowInstanceIDPromises").getOrSet(win, () => {
    return sayHello(win, {
      send,
    }).then(({ instanceID }) => instanceID);
  });
}

export function initHello({
  on,
  send,
}: {
  on: OnType;
  send: SendType;
}): CancelableType {
  return globalStore("builtinListeners").getOrSet("helloListener", () => {
    const listener = listenForHello({
      on,
    });
    const parent = getAncestor();

    if (parent) {
      sayHello(parent, {
        send,
      }).catch((err) => {
        // $FlowFixMe
        if (__TEST__ && getGlobal(parent)) {
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw err;
        }
      });
    }

    return listener;
  });
}

export function awaitWindowHello(
  win: CrossDomainWindowType,
  timeout = 5000,
  name = "Window"
): ZalgoPromise<{
  domain: string;
}> {
  let promise = getHelloPromise(win);

  if (timeout !== -1) {
    promise = promise.timeout(
      timeout,
      new Error(`${name} did not load after ${timeout}ms`)
    );
  }

  return promise;
}
