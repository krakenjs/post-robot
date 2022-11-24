import { wrapPromise } from "@krakenjs/belter";
import { on, send } from "../../src";
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
            {
              window: data.otherFrame,
            },
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
});
