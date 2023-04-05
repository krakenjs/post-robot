import type { CrossDomainWindowType } from "@krakenjs/cross-domain-utils/dist/esm";
import "@krakenjs/cross-domain-utils";

import { windowStore } from "../global";

export function markWindowKnown(win: CrossDomainWindowType) {
  const knownWindows = windowStore("knownWindows");
  knownWindows.set(win, true);
}

export function isWindowKnown(win: CrossDomainWindowType): boolean {
  const knownWindows = windowStore("knownWindows");
  return knownWindows.get(win, false) as boolean;
}
