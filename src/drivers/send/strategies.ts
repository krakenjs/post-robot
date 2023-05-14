import type { $Values } from "utility-types";
import type { CrossDomainWindowType } from "@krakenjs/cross-domain-utils/dist/esm";
import {
  isSameDomain,
  isSameTopWindow,
  getDomain,
  PROTOCOL,
} from "@krakenjs/cross-domain-utils/dist/esm";

import { SEND_STRATEGY, WILDCARD } from "../../conf";
import { getGlobal } from "../../global";

type SendStrategies = Record<
  $Values<typeof SEND_STRATEGY>,
  (arg0: CrossDomainWindowType, arg1: string, arg2: string) => void
>;

// @ts-expect-error SEND_MESSAGE_STRATEGIES is initialized without required methods
export const SEND_MESSAGE_STRATEGIES: SendStrategies = {};

SEND_MESSAGE_STRATEGIES[SEND_STRATEGY.POST_MESSAGE] = (
  win: CrossDomainWindowType,
  serializedMessage: string,
  domain: string
) => {
  if (domain.startsWith(PROTOCOL.FILE)) {
    domain = WILDCARD;
  }

  win.postMessage(serializedMessage, domain);
};

if (__POST_ROBOT__.__GLOBAL_MESSAGE_SUPPORT__) {
  SEND_MESSAGE_STRATEGIES[SEND_STRATEGY.GLOBAL] = (
    win: CrossDomainWindowType,
    serializedMessage: string
  ) => {
    if (!isSameDomain(win)) {
      throw new Error(
        `Post message through global disabled between different domain windows`
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    if (isSameTopWindow(window, win) !== false) {
      throw new Error(
        `Can only use global to communicate between two different windows, not between frames`
      );
    }

    const foreignGlobal = getGlobal(win);

    if (!foreignGlobal) {
      throw new Error(`Can not find postRobot global on foreign window`);
    }

    foreignGlobal.receiveMessage({
      source: window,
      origin: getDomain(),
      data: serializedMessage,
    });
  };
}
