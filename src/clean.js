/* @flow */

import {
  type CrossDomainWindowType,
  isWindowClosed,
} from "@krakenjs/cross-domain-utils/src";
import { noop } from "@krakenjs/belter/src";

import { windowStore } from "./global";

export function cleanUpWindow(win: CrossDomainWindowType) {
  const requestPromises = windowStore("requestPromises");
  for (const promise of requestPromises.get(win, [])) {
    promise
      .reject(
        new Error(
          `Window ${
            isWindowClosed(win) ? "closed" : "cleaned up"
          } before response`
        )
      )
      .catch(noop);
  }
}
