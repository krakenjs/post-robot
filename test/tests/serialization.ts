import { ZalgoPromise } from "@krakenjs/zalgo-promise";
import { WINDOW_TYPE } from "@krakenjs/cross-domain-utils";
import { uniqueID, getBody } from "@krakenjs/belter";
import { send } from "../../src";
import { awaitWindowHello } from "../../src/lib";
import { createIframe, getWindows } from "../common";
describe("Serialization cases", () => {
  it("should pass a function across windows and be able to call it later", () => {
    const { childFrame } = getWindows();
    const expectedArgument = 567;
    let actualArgument;
    const expectedReturn = "hello world";

    const myfunction = (val) => {
      actualArgument = val;
      return expectedReturn;
    };

    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        myfunction,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.myfunction(expectedArgument);
      })
      .then((result) => {
        if (actualArgument !== expectedArgument) {
          throw new Error(
            `Expected function to accept ${expectedArgument}, got ${actualArgument}`
          );
        }

        if (result !== expectedReturn) {
          throw new Error(
            `Expected function to return ${expectedReturn}, got ${result}`
          );
        }
      });
  });
  it("should pass a function across windows and be able to call it later and capture the exception", () => {
    const { childFrame } = getWindows();
    const expectedErrorMessage = "something went wrong";
    const expectedErrorCode = "ERROR_567";
    let expectedErrorStack;

    const myfunction = () => {
      const err = new Error(expectedErrorMessage);
      // $FlowFixMe
      err.code = expectedErrorCode;
      expectedErrorStack = err.stack;
      throw err;
    };

    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        myfunction,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.myfunction();
      })
      .catch((err) => {
        if (!(err instanceof Error)) {
          throw new TypeError(`Expected err to be an Error instance`);
        }

        if (err.message !== expectedErrorMessage) {
          throw new Error(
            `Expected function throw error with message ${expectedErrorMessage}, got ${err.message}`
          );
        }

        // $FlowFixMe
        if (err.code !== expectedErrorCode) {
          throw new Error( // $FlowFixMe
            `Expected function throw error with code ${expectedErrorCode}, got ${err.code}`
          );
        }

        if (!expectedErrorStack) {
          throw new Error(`Expected error to have stack`);
        }

        if (err.stack.indexOf(expectedErrorStack) === -1) {
          throw new Error(
            `Expected function throw error with stack ${expectedErrorStack}, got ${err.stack}`
          );
        }
      });
  });
  it("should pass a function across windows and be able to call it instantly from its origin window", () => {
    const { childFrame } = getWindows();
    const expectedArgument = 567;
    let actualArgument;
    const expectedReturn = "hello world";

    const myfunction = (val) => {
      actualArgument = val;
      return expectedReturn;
    };

    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        myfunction,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        const promise = data.myfunction(expectedArgument);

        if (actualArgument !== expectedArgument) {
          throw new Error(
            `Expected function to accept ${expectedArgument}, got ${actualArgument}`
          );
        }

        return promise;
      })
      .then((result) => {
        if (result !== expectedReturn) {
          throw new Error(
            `Expected function to return ${expectedReturn}, got ${result}`
          );
        }
      });
  });
  it("should pass a promise across windows and be able to call it later", () => {
    const { childFrame } = getWindows();
    const expectedValue = 123;
    let resolver;
    // eslint-disable-next-line promise/no-native, no-restricted-globals, compat/compat
    const promise = new Promise((resolve) => {
      resolver = resolve;
    });
    const sendPromise = send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        promise,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.promise;
      })
      .then((result) => {
        if (result !== expectedValue) {
          throw new Error(
            `Expected promise to resolve to ${expectedValue}, got ${result}`
          );
        }
      });

    if (!resolver) {
      throw new Error(`Expected resolver to be set`);
    }

    resolver(expectedValue);
    return sendPromise;
  });
  it("should pass a promise across windows and be able to reject it later", () => {
    const { childFrame } = getWindows();
    const expectedErrorMessage = "Oh no!";
    const expectedErrorCode = "ABC123";
    let expectedErrorStack; // eslint-disable-line prefer-const

    let rejector;
    // eslint-disable-next-line promise/no-native, no-restricted-globals, compat/compat
    const promise = new Promise((resolve, reject) => {
      rejector = reject;
    });
    const sendPromise = send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        promise,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.promise;
      })
      .catch((err2) => {
        if (!(err2 instanceof Error)) {
          throw new TypeError(`Expected err to be an Error instance`);
        }

        if (err2.message !== expectedErrorMessage) {
          throw new Error(
            `Expected function throw error with message ${expectedErrorMessage}, got ${err2.message}`
          );
        }

        // $FlowFixMe
        if (err2.code !== expectedErrorCode) {
          throw new Error( // $FlowFixMe
            `Expected function throw error with code ${expectedErrorCode}, got ${err2.code}`
          );
        }

        if (!expectedErrorStack) {
          throw new Error(`Expected error to have stack`);
        }

        if (err2.stack.indexOf(expectedErrorStack) === -1) {
          throw new Error(
            `Expected function throw error with stack ${expectedErrorStack}, got ${err2.stack}`
          );
        }
      });
    const err = new Error(expectedErrorMessage);
    // $FlowFixMe
    err.code = expectedErrorCode;
    expectedErrorStack = err.stack;

    if (!rejector) {
      throw new Error(`Expected rejector to be set`);
    }

    rejector(err);
    return sendPromise;
  });
  it("should pass a zalgo promise across windows and be able to call it later", () => {
    const { childFrame } = getWindows();
    const expectedValue = 123;
    let resolver;
    const promise = new ZalgoPromise((resolve) => {
      resolver = resolve;
    });
    const sendPromise = send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        promise,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.promise;
      })
      .then((result) => {
        if (result !== expectedValue) {
          throw new Error(
            `Expected promise to resolve to ${expectedValue}, got ${result}`
          );
        }
      });

    if (!resolver) {
      throw new Error(`Expected resolver to be set`);
    }

    resolver(expectedValue);
    return sendPromise;
  });
  it("should pass a zalgo promise across windows and be able to reject it later", () => {
    const { childFrame } = getWindows();
    const expectedErrorMessage = "Oh no!";
    const expectedErrorCode = "ABC123";
    let expectedErrorStack; // eslint-disable-line prefer-const

    let rejector;
    const promise = new ZalgoPromise((resolve, reject) => {
      rejector = reject;
    });
    const sendPromise = send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        promise,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.promise;
      })
      .catch((err2) => {
        if (!(err2 instanceof Error)) {
          throw new TypeError(`Expected err to be an Error instance`);
        }

        if (err2.message !== expectedErrorMessage) {
          throw new Error(
            `Expected function throw error with message ${expectedErrorMessage}, got ${err2.message}`
          );
        }

        // $FlowFixMe
        if (err2.code !== expectedErrorCode) {
          throw new Error( // $FlowFixMe
            `Expected function throw error with code ${expectedErrorCode}, got ${err2.code}`
          );
        }

        if (!expectedErrorStack) {
          throw new Error(`Expected error to have stack`);
        }

        if (err2.stack.indexOf(expectedErrorStack) === -1) {
          throw new Error(
            `Expected function throw error with stack ${expectedErrorStack}, got ${err2.stack}`
          );
        }
      });
    const err = new Error(expectedErrorMessage);
    // $FlowFixMe
    err.code = expectedErrorCode;
    expectedErrorStack = err.stack;

    if (!rejector) {
      throw new Error(`Expected rejector to be set`);
    }

    rejector(err);
    return sendPromise;
  });
  it("should pass an iframe across the window boundary and focus it", () => {
    const { childFrame } = getWindows();
    const iframe = document.createElement("iframe");
    getBody().appendChild(iframe);
    const mywindow = iframe.contentWindow;
    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        mywindow,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.mywindow.focus();
      });
  });
  it("should pass an iframe across the window boundary and close it", () => {
    const { childFrame } = getWindows();
    const iframe = document.createElement("iframe");
    getBody().appendChild(iframe);
    const mywindow = iframe.contentWindow;
    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        mywindow,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.mywindow.close();
      });
  });
  it("should pass an iframe across the window boundary and change its location", () => {
    const { childFrame } = getWindows();
    const iframe = document.createElement("iframe");
    getBody().appendChild(iframe);
    const mywindow = iframe.contentWindow;
    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        mywindow,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.mywindow.setLocation("/base/test/child.htm");
      })
      .then(() => {
        return awaitWindowHello(mywindow);
      })
      .then(() => {
        return send(mywindow, "setupListener", {
          messageName: "foo",
          data: {
            hello: "world",
          },
        });
      })
      .then(() => {
        return send(mywindow, "foo");
      })
      .then(({ data }) => {
        if (data.hello !== "world") {
          throw new Error(`Expected hello to equal world, got ${data.hello}`);
        }
      });
  });
  it("should pass an iframe across the window boundary and get its instance id", () => {
    const { childFrame } = getWindows();
    const iframe = document.createElement("iframe");
    getBody().appendChild(iframe);
    const mywindow = iframe.contentWindow;
    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        mywindow,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.mywindow.setLocation("/base/test/child.htm");
      })
      .then((win) => {
        return win.getInstanceID();
      })
      .then((instanceID) => {
        if (!instanceID || typeof instanceID !== "string") {
          throw new Error(`Expected instance id to be returned`);
        }
      });
  });
  it("should pass a popup across the window boundary and focus it", () => {
    const { childFrame } = getWindows();
    const mywindow = window.open("", uniqueID(), "width=500,height=500");
    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        mywindow,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.mywindow.focus();
      });
  });
  it("should pass a popup across the window boundary and close it", () => {
    const { childFrame } = getWindows();
    const mywindow = window.open("", uniqueID(), "width=500,height=500");
    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        mywindow,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.mywindow.close();
      })
      .then(() => {
        if (!mywindow.closed) {
          throw new Error(`Expected window to be closed`);
        }
      });
  });
  it("should get window type for popup even if window closed after serialization", () => {
    const { childFrame } = getWindows();
    const mywindow = window.open("", uniqueID(), "width=500,height=500");
    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        mywindow,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        mywindow.close();
        return data.mywindow.getType();
      })
      .then((type) => {
        if (type !== WINDOW_TYPE.POPUP) {
          throw new Error(`Expected window to be a popup`);
        }
      });
  });
  it("should get window type for iframe even if window closed after serialization", () => {
    const { childFrame } = getWindows();
    const mywindow = createIframe("child.htm");
    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        mywindow,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        // $FlowFixMe
        mywindow.frameElement.parentNode.removeChild(mywindow.frameElement);
        return data.mywindow.getType();
      })
      .then((type) => {
        if (type !== WINDOW_TYPE.IFRAME) {
          throw new Error(`Expected window to be an iframe`);
        }
      });
  });
  it("should error getting window type for popup if window is closed prior to serialization", () => {
    const { childFrame } = getWindows();
    const mywindow = window.open("", uniqueID(), "width=500,height=500");
    mywindow.close();
    let error;
    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        mywindow,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.mywindow.getType().catch((err) => {
          error = err;
        });
      })
      .then(() => {
        if (!error) {
          throw new Error(`Expected error to be thrown`);
        }
      });
  });
  it("should error getting window type for iframe if window is closed prior to serialization", () => {
    const { childFrame } = getWindows();
    const mywindow = createIframe("child.htm");
    // $FlowFixMe
    mywindow.frameElement.parentNode.removeChild(mywindow.frameElement);
    let error;
    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        mywindow,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.mywindow.getType().catch((err) => {
          error = err;
        });
      })
      .then(() => {
        if (!error) {
          throw new Error(`Expected error to be thrown`);
        }
      });
  });
  it("should pass a popup across the window boundary and change its location", () => {
    const { childFrame } = getWindows();
    const mywindow = window.open("", uniqueID(), "width=500,height=500");
    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        mywindow,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.mywindow.setLocation("/base/test/child.htm");
      })
      .then(() => {
        return awaitWindowHello(mywindow);
      })
      .then(() => {
        return send(mywindow, "setupListener", {
          messageName: "foo",
          data: {
            hello: "world",
          },
        });
      })
      .then(() => {
        return send(mywindow, "foo");
      })
      .then(({ data }) => {
        if (data.hello !== "world") {
          throw new Error(`Expected hello to equal world, got ${data.hello}`);
        }
      });
  });
  it("should pass a popup across the window boundary and get its instance id", () => {
    const { childFrame } = getWindows();
    const mywindow = window.open("", uniqueID(), "width=500,height=500");
    return send(childFrame, "setupListener", {
      messageName: "foo",
      data: {
        mywindow,
      },
    })
      .then(() => {
        return send(childFrame, "foo");
      })
      .then(({ data }) => {
        return data.mywindow.setLocation("/base/test/child.htm");
      })
      .then((win) => {
        return win.getInstanceID();
      })
      .then((instanceID) => {
        if (!instanceID || typeof instanceID !== "string") {
          throw new Error(`Expected instance id to be returned`);
        }
      });
  });
});
