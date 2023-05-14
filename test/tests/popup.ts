import { send } from "../../src";
import { getWindows } from "../common";

describe("Popup cases", () => {
  it("should work with a popup window", () => {
    const { childWindow } = getWindows();
    return send(childWindow, "setupListener", {
      messageName: "foo",
      data: {
        foo: "bar",
      },
    }).then(() => {
      return send(childWindow, "foo").then(({ data }) => {
        if (data.foo !== "bar") {
          throw new Error(`Expected data.foo to be 'bar', got ${data.foo}`);
        }
      });
    });
  });
});
