import type { $Values } from "utility-types";

import type { MESSAGE_TYPE, MESSAGE_ACK } from "../conf";

export type RequestMessage = {
  id: string;
  origin: string;
  type: typeof MESSAGE_TYPE.REQUEST;
  name: string;
  hash: string;
  data: Record<string, unknown> | null | undefined;
  fireAndForget?: boolean;
};

export type AckResponseMessage = {
  id: string;
  origin: string;
  type: typeof MESSAGE_TYPE.ACK;
  name: string;
  hash: string;
};

export type ResponseMessage = {
  id: string;
  origin: string;
  type: typeof MESSAGE_TYPE.RESPONSE;
  ack: $Values<typeof MESSAGE_ACK>;
  name: string;
  hash: string;
  data: Record<string, unknown> | null | undefined;
  error: unknown;
};

export type Message = RequestMessage | AckResponseMessage | ResponseMessage;

export type PackedMessages = {
  [key in typeof __POST_ROBOT__.__GLOBAL_KEY__]?: readonly Message[];
};
