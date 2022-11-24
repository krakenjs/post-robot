import { send, on, once } from "../src";

on("sendMessageToParent", ({ data }) => {
  return send(window.opener || window.parent, data.messageName, data.data).then(
    (event) => event.data
  );
});

on("setupListener", ({ data }) => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  once(data.messageName, () => {
    return data.handler ? data.handler() : data.data;
  });
});

on("waitForMessage", ({ data }) => {
  return once(data.messageName, () => {
    return data.handler ? data.handler() : data.data;
  }).then((event) => event.data);
});

window.addEventListener("error", () => {
  // pass
});
