import { ZalgoPromise } from "@krakenjs/zalgo-promise";
import { wrapPromise } from "@krakenjs/belter";
import { on, send } from "../../src";
import { getWindows } from "../common";
describe("Error cases", () => {
  it("should get an error when messaging with an unknown name", (): ZalgoPromise<unknown> => {
    const { childFrame } = getWindows();
    return send(childFrame, "doesntexist").then(
      () => {
        throw new Error("Expected success handler to not be called");
      },
      (err) => {
        if (!err) {
          throw new Error(`Expected err`);
        }
      }
    );
  });
  it("should error out if you try to register the same listener name twice", () => {
    on("onceonly", () => {
      // pass
    });

    try {
      on("onceonly", () => {
        // pass
      });
    } catch (err) {
      if (!err) {
        throw new Error(`Expected err`);
      }

      return;
    }

    throw new Error("Expected error handler to be called");
  });
  it("should fail to send a message when the expected domain does not match", () => {
    return wrapPromise(({ expect, avoid }) => {
      const { childFrame } = getWindows();
      on(
        "foobuzzzzz",
        {
          domain: "http://www.zombo.com",
        },
        avoid("onFoobuzzzzz")
      );
      send(childFrame, "sendMessageToParent", {
        messageName: "foobuzzzzz",
      }).then(
        avoid("successHandler"),
        expect("errorHandler", (err) => {
          if (!err) {
            throw new Error(`Expected err`);
          }
        })
      );
    });
  });
  it("should fail to send a message when the target domain does not match", (): ZalgoPromise<unknown> => {
    const { childFrame } = getWindows();
    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        foo: "bar",
      },
    }).then(() => {
      return send(
        childFrame,
        "foo",
        {},
        {
          domain: "http://www.zombo.com",
        }
      ).then(
        () => {
          throw new Error("Expected success handler to not be called");
        },
        (err) => {
          if (!err) {
            throw new Error(`Expected err`);
          }
        }
      );
    });
  });
});
