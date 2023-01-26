import type { CrossDomainWindowType } from "@krakenjs/cross-domain-utils/dist/esm";
import { isWindowClosed } from "@krakenjs/cross-domain-utils/dist/esm";
import { noop } from "@krakenjs/belter/dist/esm";
import type { ZalgoPromise } from "@krakenjs/zalgo-promise";

import { windowStore } from "./global";

export function cleanUpWindow(win: CrossDomainWindowType) {
  const requestPromises =
    windowStore<Array<ZalgoPromise<unknown>>>("requestPromises");
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
