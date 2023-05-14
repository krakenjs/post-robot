import type { CrossDomainWindowType } from "@krakenjs/cross-domain-utils/dist/esm";
import { isWindowClosed } from "@krakenjs/cross-domain-utils/dist/esm";
import { noop } from "@krakenjs/belter/dist/esm";

import { windowStore } from "./global";

export function cleanUpWindow(win: CrossDomainWindowType) {
  const requestPromises =
    windowStore<Array<Promise<unknown>>>("requestPromises");
  for (const promise of requestPromises.get(win, [])) {
    promise
      // @ts-expect-error - not sure why reject isnt available on native promise
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
