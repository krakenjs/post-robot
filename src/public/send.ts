import type {
  CrossDomainWindowType,
  DomainMatcher,
} from "@krakenjs/cross-domain-utils/dist/esm";
import {
  isAncestor,
  isWindowClosed,
  getDomain,
  matchDomain,
} from "@krakenjs/cross-domain-utils/dist/esm";
import {
  uniqueID,
  isRegex,
  noop,
  safeInterval,
  stringify,
  stringifyError,
} from "@krakenjs/belter/dist/esm";

import {
  CHILD_WINDOW_TIMEOUT,
  MESSAGE_TYPE,
  WILDCARD,
  MESSAGE_NAME,
  ACK_TIMEOUT,
  RES_TIMEOUT,
  ACK_TIMEOUT_KNOWN,
  RESPONSE_CYCLE_TIME,
} from "../conf";
import type { ResponseListenerType } from "../drivers";
import {
  sendMessage,
  addResponseListener,
  deleteResponseListener,
  markResponseListenerErrored,
} from "../drivers";
import { awaitWindowHello, sayHello, isWindowKnown } from "../lib";
import { windowStore } from "../global";
import { ProxyWindow } from "../serialize/window";
import type { ResponseMessageEvent, SendType } from "../types";

import { on } from "./on";
import { promiseTry } from "../promiseUtils";

function validateOptions(
  name: string,
  win: CrossDomainWindowType,
  domain: DomainMatcher | null | undefined
) {
  if (!name) {
    throw new Error("Expected name");
  }

  if (domain) {
    if (
      typeof domain !== "string" &&
      !Array.isArray(domain) &&
      !isRegex(domain)
    ) {
      throw new TypeError(
        `Can not send ${name}. Expected domain ${JSON.stringify(
          domain
        )} to be a string, array, or regex`
      );
    }
  }

  if (isWindowClosed(win)) {
    throw new Error(`Can not send ${name}. Target window is closed`);
  }
}

function normalizeDomain(
  win: CrossDomainWindowType,
  targetDomain: DomainMatcher,
  actualDomain: string | null | undefined,
  {
    send,
  }: {
    send: SendType;
  }
): Promise<string> {
  // @ts-expect-error TODO: get promise unfurling working in Zalgo types
  return promiseTry(() => {
    if (typeof targetDomain === "string") {
      return targetDomain;
    }

    return promiseTry(() => {
      return (
        actualDomain ||
        sayHello(win, {
          send,
        }).then(({ domain }) => domain)
      );
    }).then((normalizedDomain) => {
      if (!matchDomain(targetDomain, targetDomain)) {
        throw new Error(
          `Domain ${stringify(targetDomain)} does not match ${stringify(
            targetDomain
          )}`
        );
      }

      return normalizedDomain;
    });
  });
}

export const send: SendType = (winOrProxyWin, name, data, options) => {
  options = options || {};
  const domainMatcher = options.domain || WILDCARD;
  const responseTimeout = options.timeout || RES_TIMEOUT;
  const childTimeout = options.timeout || CHILD_WINDOW_TIMEOUT;
  const fireAndForget = options.fireAndForget || false;

  return ProxyWindow.toProxyWindow(winOrProxyWin, {
    send,
  })
    .awaitWindow()
    .then((win) => {
      return (
        promiseTry(() => {
          validateOptions(name, win, domainMatcher);

          if (isAncestor(window, win)) {
            return awaitWindowHello(win, childTimeout);
          }
        })
          // @ts-expect-error - idk this is new
          .then(({ domain: actualDomain } = {}) => {
            return normalizeDomain(win, domainMatcher, actualDomain, {
              send,
            });
          })
          .then((targetDomain) => {
            const domain = targetDomain;

            const logName =
              name === MESSAGE_NAME.METHOD &&
              data &&
              typeof data.name === "string"
                ? `${data.name}()`
                : name;

            if (__DEBUG__) {
              console.info("send::req", logName, domain, "\n\n", data); // eslint-disable-line no-console
            }

            // @ts-expect-error - expected args
            const promise = new Promise<ResponseMessageEvent>();
            const hash = `${name}_${uniqueID()}`;

            if (!fireAndForget) {
              const responseListener: ResponseListenerType = {
                name,
                win,
                // @ts-expect-error - domain is unknown not DomainMatcher
                domain,
                promise,
              };
              addResponseListener(hash, responseListener);

              const reqPromises = windowStore<Array<Promise<unknown>>>(
                "requestPromises"
              ).getOrSet(win, () => []);
              reqPromises.push(promise);

              promise.catch(() => {
                markResponseListenerErrored(hash);
                deleteResponseListener(hash);
              });

              const totalAckTimeout = isWindowKnown(win)
                ? ACK_TIMEOUT_KNOWN
                : ACK_TIMEOUT;
              const totalResTimeout = responseTimeout;

              let ackTimeout = totalAckTimeout;
              let resTimeout = totalResTimeout;

              const interval = safeInterval(() => {
                if (isWindowClosed(win)) {
                  return Promise.reject(
                    new Error(
                      `Window closed for ${name} before ${
                        responseListener.ack ? "response" : "ack"
                      }`
                    )
                  );
                }

                if (responseListener.cancelled) {
                  return Promise.reject(
                    new Error(`Response listener was cancelled for ${name}`)
                  );
                }

                ackTimeout = Math.max(ackTimeout - RESPONSE_CYCLE_TIME, 0);
                if (resTimeout !== -1) {
                  resTimeout = Math.max(resTimeout - RESPONSE_CYCLE_TIME, 0);
                }

                if (!responseListener.ack && ackTimeout === 0) {
                  return Promise.reject(
                    new Error(
                      `No ack for postMessage ${logName} in ${getDomain()} in ${totalAckTimeout}ms`
                    )
                  );
                } else if (resTimeout === 0) {
                  return Promise.reject(
                    new Error(
                      `No response for postMessage ${logName} in ${getDomain()} in ${totalResTimeout}ms`
                    )
                  );
                }
              }, RESPONSE_CYCLE_TIME);

              promise
                .finally(() => {
                  interval.cancel();
                  reqPromises.splice(reqPromises.indexOf(promise, 1));
                })
                .catch(noop);
            }

            return sendMessage(
              win,
              // @ts-expect-error - domain is unknown not DomainMatcher
              domain,
              {
                id: uniqueID(),
                origin: getDomain(window),
                type: MESSAGE_TYPE.REQUEST,
                hash,
                name,
                data,
                fireAndForget,
              },
              {
                on,
                send,
              }
            ).then(
              () => {
                // @ts-expect-error ZalgoPromise.resolve requires one argument
                return fireAndForget ? promise.resolve() : promise;
              },
              (err: unknown) => {
                throw new Error(
                  `Send request message failed for ${logName} in ${getDomain()}\n\n${stringifyError(
                    err
                  )}`
                );
              }
            );
          })
      );
    });
};
