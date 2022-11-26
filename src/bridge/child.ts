import { ZalgoPromise } from "@krakenjs/zalgo-promise";
import type { CrossDomainWindowType } from "@krakenjs/cross-domain-utils/dist/esm";
import {
  isSameDomain,
  getOpener,
  getDomain,
  getFrameByName,
  assertSameDomain,
} from "@krakenjs/cross-domain-utils/dist/esm";
import { noop } from "@krakenjs/belter/dist/esm";

import { getGlobal, windowStore } from "../global";
import type { OnType, SendType, ReceiveMessageType } from "../types";
import {
  needsBridge,
  registerRemoteWindow,
  rejectRemoteSendMessage,
  registerRemoteSendMessage,
  getBridgeName,
  type SendMessageType,
} from "./common";

function awaitRemoteBridgeForWindow(
  win: CrossDomainWindowType
): ZalgoPromise<CrossDomainWindowType> {
  // @ts-expect-error how does this become a zalgo-promise?
  return windowStore<ZalgoPromise<Window | ZalgoPromise<Window> | undefined>>(
    "remoteBridgeAwaiters"
  ).getOrSet(win, () => {
    return ZalgoPromise.try(() => {
      const frame = getFrameByName(win, getBridgeName(getDomain()));

      if (!frame) {
        return;
      }

      if (isSameDomain(frame) && getGlobal(assertSameDomain(frame))) {
        return frame;
      }

      return new ZalgoPromise<CrossDomainWindowType>((resolve) => {
        let interval: NodeJS.Timer;
        // eslint-disable-next-line prefer-const
        let timeout: NodeJS.Timeout;
        // eslint-disable-next-line prefer-const
        interval = setInterval(() => {
          if (
            frame &&
            isSameDomain(frame) &&
            getGlobal(assertSameDomain(frame))
          ) {
            clearInterval(interval);
            clearTimeout(timeout);
            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
            return resolve(frame);
          }
        }, 100);
        timeout = setTimeout(() => {
          clearInterval(interval);
          // @ts-expect-error expected 1 argument but got 0. need to update zalgo's resolve
          // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
          return resolve();
        }, 2000);
      });
    });
  });
}

export function openTunnelToOpener({
  on,
  send,
  receiveMessage,
}: {
  on: OnType;
  send: SendType;
  receiveMessage: ReceiveMessageType;
}): ZalgoPromise<void> {
  return ZalgoPromise.try(() => {
    const opener = getOpener(window);

    if (
      !opener ||
      !needsBridge({
        win: opener,
      })
    ) {
      return;
    }

    registerRemoteWindow(opener);
    return awaitRemoteBridgeForWindow(opener).then(
      (bridge: CrossDomainWindowType) => {
        if (!bridge) {
          rejectRemoteSendMessage(
            opener,
            new Error(`Can not register with opener: no bridge found in opener`)
          );
          return;
        }

        if (!window.name) {
          rejectRemoteSendMessage(
            opener,
            new Error(
              `Can not register with opener: window does not have a name`
            )
          );
          return;
        }

        return getGlobal(assertSameDomain(bridge))
          .openTunnelToParent({
            name: window.name,
            source: window,

            canary() {
              // pass
            },

            sendMessage(message: string) {
              try {
                noop(window);
              } catch (err) {
                return;
              }

              if (!window || window.closed) {
                return;
              }

              try {
                receiveMessage(
                  {
                    data: message,
                    origin: this.origin,
                    source: this.source,
                  },
                  {
                    on,
                    send,
                  }
                );
              } catch (err) {
                void ZalgoPromise.reject(err);
              }
            },
          })
          .then(
            ({
              source,
              origin,
              data,
            }: {
              source: CrossDomainWindowType;
              origin: string;
              data: { sendMessage: SendMessageType };
            }) => {
              if (source !== opener) {
                throw new Error(`Source does not match opener`);
              }

              registerRemoteSendMessage(source, origin, data.sendMessage);
            }
          )
          .catch((err: unknown) => {
            rejectRemoteSendMessage(opener, err as Error);
            throw err;
          });
      }
    );
  });
}
