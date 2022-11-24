import { ZalgoPromise } from "@krakenjs/zalgo-promise";
import { wrapPromise } from "@krakenjs/belter";
import { on, send } from "../../src";
import { getWindows } from "../common";
describe("Happy cases", () => {
  it("should set up a simple server and listen for a request", () => {
    return wrapPromise(({ expect }) => {
      const { childFrame } = getWindows();
      on("foobu", expect("onFoobu"));
      return send(childFrame, "sendMessageToParent", {
        messageName: "foobu",
      }).then(expect("sendSuccess"));
    });
  });
  it("should set up a simple server and listen for multiple requests", (): ZalgoPromise<unknown> => {
    const { childFrame } = getWindows();
    let count = 0;
    on("multilistener", () => {
      count += 1;
    });
    return send(childFrame, "sendMessageToParent", {
      messageName: "multilistener",
    })
      .then(() => {
        return send(childFrame, "sendMessageToParent", {
          messageName: "multilistener",
        });
      })
      .then(() => {
        if (count !== 2) {
          throw new Error(`Expected count to be 2, got ${count}`);
        }
      });
  });
  it("should message a child and expect a response", (): ZalgoPromise<unknown> => {
    const { childFrame } = getWindows();
    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        foo: "bar",
      },
    }).then(() => {
      return send(childFrame, "foo").then(({ data }) => {
        if (data.foo !== "bar") {
          throw new Error(`Expected data.foo to be 'bar', got ${data.foo}`);
        }
      });
    });
  });
  it("should set up a simple server and listen for a request from a specific domain", () => {
    return wrapPromise(({ expect }) => {
      const { childFrame } = getWindows();
      on(
        "domainspecificmessage",
        {
          domain: "mock://test-post-robot-child.com",
        },
        expect("onDomainspecificmessage")
      );
      return send(childFrame, "sendMessageToParent", {
        messageName: "domainspecificmessage",
      }).then(expect("sendSuccess"));
    });
  });
  it("should message a child with a specific domain and expect a response", (): ZalgoPromise<unknown> => {
    const { childFrame } = getWindows();
    return send(
      childFrame,
      "setupListener",
      {
        messageName: "domainspecificmessage",
        data: {
          foo: "bar",
        },
      },
      {
        domain: "mock://test-post-robot-child.com",
      }
    ).then(() => {
      return send(childFrame, "domainspecificmessage").then(({ data }) => {
        if (data.foo !== "bar") {
          throw new Error(`Expected data.foo to be 'bar', got ${data.foo}`);
        }
      });
    });
  });
  it("should set up a simple server and listen for a request from multiple domains", () => {
    return wrapPromise(({ expect }) => {
      const { childFrame } = getWindows();
      on(
        "multidomainspecificmessage",
        {
          domain: [
            "mock://test-post-robot-child.com",
            "mock://non-existant-domain.com",
          ],
        },
        expect("onMultidomainspecificmessage")
      );
      send(childFrame, "sendMessageToParent", {
        messageName: "multidomainspecificmessage",
      }).then(expect("sendSuccess"));
    });
  });
  it("should message a child with multiple domains and expect a response", (): ZalgoPromise<unknown> => {
    const { childFrame } = getWindows();
    return send(
      childFrame,
      "setupListener",
      {
        messageName: "multidomainspecificmessage",
        data: {
          foo: "bar",
        },
      },
      {
        domain: [
          "mock://test-post-robot-child.com",
          "mock://non-existant-domain.com",
        ],
      }
    ).then(() => {
      return send(childFrame, "multidomainspecificmessage").then(({ data }) => {
        if (data.foo !== "bar") {
          throw new Error(`Expected data.foo to be 'bar', got ${data.foo}`);
        }
      });
    });
  });
});
