import type { $Values } from "utility-types";
import type { CrossDomainWindowType } from "@krakenjs/cross-domain-utils/dist/esm";
import {
  getDomain,
  isWindowClosed,
  matchDomain,
  stringifyDomainPattern,
} from "@krakenjs/cross-domain-utils/dist/esm";
import { noop, stringifyError, uniqueID } from "@krakenjs/belter/dist/esm";

import { MESSAGE_TYPE, MESSAGE_ACK, MESSAGE_NAME } from "../../conf";
import { sendMessage } from "../send";
import {
  getRequestListener,
  getResponseListener,
  deleteResponseListener,
  isResponseListenerErrored,
} from "../listeners";
import type {
  RequestMessage,
  AckResponseMessage,
  ResponseMessage,
} from "../types";
import type { OnType, SendType } from "../../types";
import { flushPromises, promiseTry } from "../../promiseUtils";

export function handleRequest(
  source: CrossDomainWindowType,
  origin: string,
  message: RequestMessage,
  {
    on,
    send,
  }: {
    on: OnType;
    send: SendType;
  }
): Promise<void> {
  const options = getRequestListener({
    name: message.name,
    win: source,
    domain: origin,
  });

  const logName =
    message.name === MESSAGE_NAME.METHOD &&
    message.data &&
    typeof message.data.name === "string"
      ? `${message.data.name}()`
      : message.name;

  if (__DEBUG__) {
    // eslint-disable-next-line no-console
    console.info("receive::req", logName, origin, "\n\n", message.data);
  }

  function sendAck(): Promise<void> {
    return flushPromises().then(() => {
      if (message.fireAndForget || isWindowClosed(source)) {
        return;
      }

      try {
        return sendMessage(
          source,
          origin,
          {
            id: uniqueID(),
            origin: getDomain(window),
            type: MESSAGE_TYPE.ACK,
            hash: message.hash,
            name: message.name,
          },
          {
            on,
            send,
          }
        );
      } catch (err) {
        throw new Error(
          `Send ack message failed for ${logName} in ${getDomain()}\n\n${stringifyError(
            err
          )}`
        );
      }
    });
  }

  function sendResponse(
    ack: $Values<typeof MESSAGE_ACK>,
    data: Record<string, any> | null | undefined,
    error?: unknown
  ): Promise<void> {
    return flushPromises().then(() => {
      if (message.fireAndForget || isWindowClosed(source)) {
        return;
      }

      if (__DEBUG__) {
        if (ack === MESSAGE_ACK.SUCCESS) {
          console.info("respond::res", logName, origin, "\n\n", data); // eslint-disable-line no-console
        } else if (ack === MESSAGE_ACK.ERROR) {
          console.error("respond::err", logName, origin, "\n\n", error); // eslint-disable-line no-console
        }
      }

      try {
        return sendMessage(
          source,
          origin,
          {
            id: uniqueID(),
            origin: getDomain(window),
            type: MESSAGE_TYPE.RESPONSE,
            hash: message.hash,
            name: message.name,
            ack,
            data,
            error,
          },
          {
            on,
            send,
          }
        );
      } catch (err) {
        throw new Error(
          `Send response message failed for ${logName} in ${getDomain()}\n\n${stringifyError(
            err
          )}`
        );
      }
    });
  }

  return Promise.all([
    sendAck(),

    promiseTry(() => {
      if (!options) {
        throw new Error(
          `No handler found for post message: ${message.name} from ${origin} in ${window.location.protocol}//${window.location.host}${window.location.pathname}`
        );
      }

      const data = message.data;

      return options.handler({
        source,
        origin,
        data,
      });
    }).then(
      (data) => {
        // @ts-expect-error handler returns unknown type
        return sendResponse(MESSAGE_ACK.SUCCESS, data);
      },
      (error: unknown) => {
        return sendResponse(MESSAGE_ACK.ERROR, null, error);
      }
    ),
  ])
    .then(noop)
    .catch((err) => {
      if (options && options.handleError) {
        options.handleError(err);
        return;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw err;
      }
    });
}

export function handleAck(
  source: CrossDomainWindowType,
  origin: string,
  message: AckResponseMessage
) {
  if (isResponseListenerErrored(message.hash)) {
    return;
  }

  const options = getResponseListener(message.hash);

  if (!options) {
    throw new Error(
      `No handler found for post message ack for message: ${message.name} from ${origin} in ${window.location.protocol}//${window.location.host}${window.location.pathname}`
    );
  }

  try {
    if (!matchDomain(options.domain, origin)) {
      throw new Error(
        `Ack origin ${origin} does not match domain ${options.domain.toString()}`
      );
    }

    if (source !== options.win) {
      throw new Error(`Ack source does not match registered window`);
    }
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.reject(err);
  }

  options.ack = true;
}

export function handleResponse(
  source: CrossDomainWindowType,
  origin: string,
  message: ResponseMessage
): void | Promise<void> {
  if (isResponseListenerErrored(message.hash)) {
    return;
  }

  const options = getResponseListener(message.hash);

  if (!options) {
    throw new Error(
      `No handler found for post message response for message: ${message.name} from ${origin} in ${window.location.protocol}//${window.location.host}${window.location.pathname}`
    );
  }

  if (!matchDomain(options.domain, origin)) {
    throw new Error(
      `Response origin ${origin} does not match domain ${stringifyDomainPattern(
        options.domain
      )}`
    );
  }

  if (source !== options.win) {
    throw new Error(`Response source does not match registered window`);
  }

  deleteResponseListener(message.hash);

  const logName =
    message.name === MESSAGE_NAME.METHOD &&
    message.data &&
    typeof message.data.name === "string"
      ? `${message.data.name}()`
      : message.name;

  if (message.ack === MESSAGE_ACK.ERROR) {
    if (__DEBUG__) {
      console.error("receive::err", logName, origin, "\n\n", message.error); // eslint-disable-line no-console
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.reject(message.error);
  } else if (message.ack === MESSAGE_ACK.SUCCESS) {
    if (__DEBUG__) {
      console.info("receive::res", logName, origin, "\n\n", message.data); // eslint-disable-line no-console
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    options.promise = Promise.resolve({
      source,
      origin,
      data: message.data,
    });

    // options.promise.resolve({
    //   source,
    //   origin,
    //   data: message.data,
    // });
  }
}
