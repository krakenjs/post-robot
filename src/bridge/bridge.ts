import type { ZalgoPromise } from "@krakenjs/zalgo-promise";
import type { CrossDomainWindowType } from "@krakenjs/cross-domain-utils/dist/esm";
import {
  getParent,
  isWindowClosed,
} from "@krakenjs/cross-domain-utils/dist/esm";
import { noop, uniqueID } from "@krakenjs/belter/dist/esm";

import { MESSAGE_NAME, WILDCARD } from "../conf";
import { getGlobal, globalStore } from "../global";
import type { SendType, ResponseMessageEvent } from "../types";

function cleanTunnelWindows() {
  const tunnelWindows = globalStore("tunnelWindows");

  for (const key of tunnelWindows.keys()) {
    // @ts-expect-error move to key in for better type safety
    const tunnelWindow = tunnelWindows[key];

    try {
      noop(tunnelWindow.source);
    } catch (err) {
      tunnelWindows.del(key);
      continue;
    }

    if (isWindowClosed(tunnelWindow.source)) {
      tunnelWindows.del(key);
    }
  }
}

type TunnelWindowDataType = {
  name: string;
  source: CrossDomainWindowType;
  canary: () => void;
  sendMessage: (message: string) => void;
};

function addTunnelWindow({
  name,
  source,
  canary,
  sendMessage,
}: TunnelWindowDataType): string {
  cleanTunnelWindows();
  const id = uniqueID();
  const tunnelWindows = globalStore("tunnelWindows");
  tunnelWindows.set(id, {
    name,
    source,
    canary,
    sendMessage,
  });
  return id;
}

export function setupOpenTunnelToParent({ send }: { send: SendType }) {
  getGlobal(window).openTunnelToParent = function openTunnelToParent({
    name,
    source,
    canary,
    sendMessage,
  }: TunnelWindowDataType): ZalgoPromise<ResponseMessageEvent> {
    const tunnelWindows = globalStore<Record<string, Window>>("tunnelWindows");
    const parentWindow = getParent(window);

    if (!parentWindow) {
      throw new Error(`No parent window found to open tunnel to`);
    }

    const id = addTunnelWindow({
      name,
      source,
      canary,
      sendMessage,
    });

    return send(
      parentWindow,
      MESSAGE_NAME.OPEN_TUNNEL,
      {
        name,

        sendMessage() {
          const tunnelWindow = tunnelWindows.get(id);

          try {
            // IE gets antsy if you try to even reference a closed window
            noop(tunnelWindow && tunnelWindow.source);
          } catch (err) {
            tunnelWindows.del(id);
            return;
          }

          if (
            !tunnelWindow ||
            !tunnelWindow.source ||
            isWindowClosed(tunnelWindow.source)
          ) {
            return;
          }

          try {
            // @ts-expect-error window.canary() doesn't exist
            tunnelWindow.canary();
          } catch (err) {
            return;
          }

          // @ts-expect-error lots wrong here
          // eslint-disable-next-line prefer-rest-params
          tunnelWindow.sendMessage.apply(this, arguments);
        },
      },
      {
        domain: WILDCARD,
      }
    );
  };
}
