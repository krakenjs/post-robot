/* @flow */
/* eslint max-lines: 0, max-nested-callbacks: off */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { WINDOW_TYPE } from "@krakenjs/cross-domain-utils/src";
import { wrapPromise, uniqueID } from "@krakenjs/belter/src";

import { on, send } from "../../src";
import { ProxyWindow } from "../../src/serialize/window";
import { getWindows } from "../common";

describe("Window Proxy cases", () => {
  it("Should send the a window in a message", () => {
    return wrapPromise(({ expect }) => {
      const { childFrame, otherChildFrame } = getWindows();

      const listener = on(
        "passProxyWindow",
        expect("passProxyWindow", ({ data }) => {
          if (data.otherFrame.getWindow() !== otherChildFrame) {
            throw new Error(`Expected window to be correctly passed`);
          }

          listener.cancel();
        })
      );

      return send(childFrame, "sendMessageToParent", {
        messageName: "passProxyWindow",
        data: {
          otherFrame: otherChildFrame,
        },
      }).then(expect("sendSuccess"));
    });
  });

  it("Should send the a window in a message, then call isPopup", () => {
    return wrapPromise(({ expect }) => {
      const { childFrame, otherChildFrame } = getWindows();

      const listener = on(
        "passProxyWindow",
        expect("passProxyWindow", ({ data }) => {
          return data.otherFrame.isPopup().then((isPopup) => {
            listener.cancel();
            if (isPopup !== false) {
              throw new Error(
                `Expected isPopup to be false but got ${isPopup}`
              );
            }
          });
        })
      );

      return send(childFrame, "sendMessageToParent", {
        messageName: "passProxyWindow",
        data: {
          otherFrame: otherChildFrame,
        },
      }).then(expect("sendSuccess"));
    });
  });

  it("Should send a message to a proxy window", () => {
    return wrapPromise(({ expect }) => {
      const { childFrame, otherChildFrame } = getWindows();

      const passListener = on(
        "passProxyWindow",
        expect("passProxyWindow", ({ data }) => {
          if (data.otherFrame.getWindow() !== otherChildFrame) {
            throw new Error(`Expected window to be correctly passed`);
          }

          passListener.cancel();

          return send(data.otherFrame, "sendMessageToParent", {
            messageName: "callProxyWindow",
          }).then(expect("sendSuccess"));
        })
      );

      const callListener = on(
        "callProxyWindow",
        expect("onCallProxyWindow", () => {
          callListener.cancel();
        })
      );

      return send(childFrame, "sendMessageToParent", {
        messageName: "passProxyWindow",
        data: {
          otherFrame: otherChildFrame,
        },
      }).then(expect("sendSuccess"));
    });
  });

  it("Should receive a message from a proxy window", () => {
    return wrapPromise(({ expect }) => {
      const { childFrame, otherChildFrame } = getWindows();

      const passListener = on(
        "passProxyWindow",
        expect("passProxyWindow", ({ data }) => {
          if (data.otherFrame.getWindow() !== otherChildFrame) {
            throw new Error(`Expected window to be correctly passed`);
          }

          passListener.cancel();

          const callListener = on(
            "callProxyWindow",
            { window: data.otherFrame },
            expect("onCallProxyWindow", () => {
              callListener.cancel();
            })
          );

          return send(data.otherFrame, "sendMessageToParent", {
            messageName: "callProxyWindow",
          }).then(expect("sendSuccess"));
        })
      );

      return send(childFrame, "sendMessageToParent", {
        messageName: "passProxyWindow",
        data: {
          otherFrame: otherChildFrame,
        },
      }).then(expect("sendSuccess"));
    });
  });

  it("Should reopen a named popup on focus when the underlying window is not available", () => {
    return wrapPromise(({ expect }) => {
      const popupName = uniqueID();

      const serializedWindow = {
        id: uniqueID(),
        getType: () => ZalgoPromise.resolve(WINDOW_TYPE.POPUP),
        close: () => ZalgoPromise.resolve(),
        focus: () => ZalgoPromise.resolve(),
        isClosed: () => ZalgoPromise.resolve(false),
        setLocation: () => ZalgoPromise.resolve(),
        getName: () => ZalgoPromise.resolve(popupName),
        setName: () => ZalgoPromise.resolve(),
        getInstanceID: () => ZalgoPromise.resolve(uniqueID()),
      };

      const proxyWin = new ProxyWindow({
        serializedWindow,
        // $FlowFixMe
        send: () => ZalgoPromise.resolve(),
      });

      const originalOpen = window.open;
      const restore = () => {
        window.open = originalOpen;
      };

      // $FlowFixMe
      window.open = expect("windowOpen", (url, name) => {
        if (url !== "") {
          throw new Error(
            `Expected window.open to be called with empty url, got ${String(
              url
            )}`
          );
        }
        if (name !== popupName) {
          throw new Error(
            `Expected window.open to be called with name ${popupName}, got ${String(
              name
            )}`
          );
        }
        return null;
      });

      return proxyWin.focus().then(restore, (err) => {
        restore();
        throw err;
      });
    });
  });
});
