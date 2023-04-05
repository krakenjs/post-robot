import { on, send, once } from "../../src";
import { getWindows } from "../common";

describe("Options cases", () => {
  it("should be able to listen for a message only once", () => {
    const { childFrame } = getWindows();
    let count = 0;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    once("foobuz", () => {
      count += 1;
    });
    return send(childFrame, "sendMessageToParent", {
      messageName: "foobuz",
    }).then(() => {
      return send(childFrame, "sendMessageToParent", {
        messageName: "foobuz",
      }).then(
        () => {
          throw new Error("Expected success handler to not be called");
        },
        () => {
          if (count !== 1) {
            throw new Error(`Expected count to be 1, got ${count}`);
          }
        }
      );
    });
  });

  it("should be able to re-register the same once handler after the first is called", () => {
    const { childFrame } = getWindows();
    let count = 0;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    once("foobuzz", ({ data }) => {
      count += data.add;
    });
    return send(childFrame, "sendMessageToParent", {
      messageName: "foobuzz",
      data: {
        add: 2,
      },
    })
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        once("foobuzz", ({ data }) => {
          count += data.add;
        });
        return send(childFrame, "sendMessageToParent", {
          messageName: "foobuzz",
          data: {
            add: 3,
          },
        });
      })
      .then(() => {
        if (count !== 5) {
          throw new Error(`Expected count to be 5, got ${count}`);
        }
      });
  });

  it("should allow you to register the same listener twice providing it is to different windows", () => {
    const { childFrame, otherChildFrame } = getWindows();
    on(
      "onceonlywindow",
      {
        window: childFrame,
      },
      () => {
        // pass
      }
    );
    on(
      "onceonlywindow",
      {
        window: otherChildFrame,
      },
      () => {
        // pass
      }
    );
  });

  it("should allow you to register a listener for a specific window", () => {
    const { childFrame, otherChildFrame } = getWindows();
    let count = 0;
    on(
      "specificchildlistener",
      {
        window: otherChildFrame,
      },
      () => {
        count += 1;
      }
    );
    return send(otherChildFrame, "sendMessageToParent", {
      messageName: "specificchildlistener",
    }).then(() => {
      return send(childFrame, "sendMessageToParent", {
        messageName: "specificchildlistener",
      }).then(
        () => {
          throw new Error("Expected success handler to not be called");
        },
        (err) => {
          if (!err) {
            throw new Error(`Expected err`);
          }

          if (count !== 1) {
            throw new Error(`Expected count to be 1, got ${count}`);
          }
        }
      );
    });
  });
});
