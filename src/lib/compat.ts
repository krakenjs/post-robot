import { getUserAgent } from "@krakenjs/cross-domain-utils/dist/esm";

export function needsGlobalMessagingForBrowser(): boolean {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  if (getUserAgent(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) {
    return true;
  }

  return false;
}
