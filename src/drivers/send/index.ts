import type { CrossDomainWindowType } from "@krakenjs/cross-domain-utils/dist/esm";
import { isWindowClosed } from "@krakenjs/cross-domain-utils/dist/esm";
import { stringifyError, noop } from "@krakenjs/belter/dist/esm";

import { serializeMessage } from "../../serialize";
import { windowStore, getGlobalKey } from "../../global";
import type { Message, PackedMessages } from "../types";
import type { OnType, SendType } from "../../types";

import { SEND_MESSAGE_STRATEGIES } from "./strategies";
import { flushPromises, promiseTry } from "../../promiseUtils";

function packMessages(messages: readonly Message[]): PackedMessages {
  return {
    [getGlobalKey()]: messages,
  };
}

type DomainBuffer = {
  buffer?: Message[];
  flush?: Promise<void>;
};

export function sendMessage(
  win: CrossDomainWindowType,
  domain: string,
  message: Message,
  {
    on,
    send,
  }: {
    on: OnType;
    send: SendType;
  }
): Promise<void> {
  return promiseTry(() => {
    const messageBuffer = windowStore<DomainBuffer>();

    const domainBuffer = messageBuffer.getOrSet(win, () => ({}));

    domainBuffer.buffer = domainBuffer.buffer || [];
    domainBuffer.buffer.push(message);

    domainBuffer.flush =
      domainBuffer.flush ||
      flushPromises().then(() => {
        if (isWindowClosed(win)) {
          throw new Error("Window is closed");
        }

        const serializedMessage = serializeMessage(
          win,
          domain,
          packMessages(domainBuffer.buffer || []),
          {
            on,
            send,
          }
        );
        delete domainBuffer.buffer;

        const strategies = Object.keys(SEND_MESSAGE_STRATEGIES);
        const errors = [];

        for (const strategyName of strategies as Array<
          keyof typeof SEND_MESSAGE_STRATEGIES
        >) {
          try {
            SEND_MESSAGE_STRATEGIES[strategyName](
              win,
              serializedMessage,
              domain
            );
          } catch (err) {
            errors.push(err);
          }
        }

        if (errors.length === strategies.length) {
          throw new Error(
            `All post-robot messaging strategies failed:\n\n${errors
              .map((err, i) => `${i}. ${stringifyError(err)}`)
              .join("\n\n")}`
          );
        }
      });

    return domainBuffer.flush.then(() => {
      delete domainBuffer.flush;
    });
  }).then(noop);
}
