import { ZalgoPromise } from "@krakenjs/zalgo-promise";
import { getBody, noop } from "@krakenjs/belter";
// import type { CrossDomainWindowType } from "@krakenjs/cross-domain-utils";
import "@krakenjs/cross-domain-utils";
import { awaitWindowHello } from "../src/lib";

// @ts-expect-error mockDomain is a custom property
window.mockDomain = "mock://test-post-robot.com";

// @ts-expect-error karma is a custom property
window.console.karma = (...args: any[]) => {
  const karma =
    // @ts-expect-error karma is a custom property
    window.karma ||
    // @ts-expect-error karma is a custom property
    (window.top && window.top.karma) ||
    (window.opener && window.opener.karma);

  if (karma) {
    karma.log("debug", args);
  }

  // eslint-disable-next-line no-console
  console.log(...args);
};

const IE8_USER_AGENT =
  "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)";
export function enableIE8Mode() {
  // @ts-expect-error mockDomain is a custom property
  window.navigator.mockUserAgent = IE8_USER_AGENT;
  return {
    cancel() {
      // @ts-expect-error mockDomain is a custom property
      delete window.navigator.mockUserAgent;
    },
  };
}

export function createIframe(
  name: string,
  callback?: (this: HTMLIFrameElement, ev: Event) => any
) {
  const frame = document.createElement("iframe");
  frame.src = `/base/test/${name}`;
  frame.id = "childframe";
  frame.name = `${Math.random().toString()}_${name.replace(
    /[^a-zA-Z0-9]+/g,
    "_"
  )}`;

  if (callback) {
    frame.addEventListener("load", callback);
  }

  getBody().appendChild(frame);
  return frame.contentWindow;
}

export function createPopup(name: string) {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const popup = window.open(
    `mock://test-post-robot-child.com/base/test/${name}`,
    `${Math.random().toString()}_${name.replace(/[^a-zA-Z0-9]+/g, "_")}`
  );

  window.focus();
  return popup;
}

let childWindow: Window | null;
let childFrame: Window | null;
let otherChildFrame: Window | null;

export function getWindows() {
  if (!childFrame || !childWindow || !otherChildFrame) {
    throw new Error(`Not all windows available`);
  }

  return {
    childWindow,
    childFrame,
    otherChildFrame,
  };
}

before(() => {
  childWindow = createPopup("child.htm");
  childFrame = createIframe("child.htm");
  otherChildFrame = createIframe("child.htm");
  return ZalgoPromise.all([
    // @ts-expect-error childWindow is possibly null
    awaitWindowHello(childWindow),
    // @ts-expect-error childFrame is possibly null
    awaitWindowHello(childFrame),
    // @ts-expect-error otherChildFrame is possibly null
    awaitWindowHello(otherChildFrame),
  ]).then(noop);
});

after(() => {
  if (!document.body) {
    throw new Error(`Expected document.body to be available`);
  }

  const body = document.body;

  // @ts-expect-error childFrame is possibly null
  if (!childFrame.frameElement) {
    throw new Error(`Expected childFrame.frameElement to be available`);
  }

  // @ts-expect-error childFrame is possibly null
  body.removeChild(childFrame.frameElement);

  // @ts-expect-error otherChildFrame is possibly null
  if (!otherChildFrame.frameElement) {
    throw new Error(`Expected otherChildFrame.frameElement to be available`);
  }

  // @ts-expect-error otherChildFrame is possibly null
  body.removeChild(otherChildFrame.frameElement);
  // @ts-expect-error childWindow is possibly null
  childWindow.close();
});
