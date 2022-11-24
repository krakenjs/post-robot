import type { ZalgoPromise } from "@krakenjs/zalgo-promise";
import type {
  CrossDomainWindowType,
  DomainMatcher,
} from "@krakenjs/cross-domain-utils";
import type { ProxyWindow } from "./serialize/window";
// export something to force webpack to see this as an ES module
export const TYPES = true;
// eslint-disable-next-line flowtype/require-exact-type
export type CancelableType = {
  cancel: () => void;
};
export type ErrorHandlerType = (err: unknown) => void;
export type HandlerType = (arg0: {
  source: CrossDomainWindowType;
  origin: string;
  data: any; // eslint-disable-line flowtype/no-weak-types
}) => void | any | ZalgoPromise<any>;
// eslint-disable-line flowtype/no-weak-types
export type ServerOptionsType = {
  handler?: HandlerType | null | undefined;
  errorHandler?: ErrorHandlerType | null | undefined;
  window?: CrossDomainWindowType | ProxyWindow;
  name?: string | null | undefined;
  domain?: DomainMatcher | null | undefined;
  once?: boolean | null | undefined;
  errorOnClose?: boolean | null | undefined;
};
export type OnType = (
  name: string,
  options: ServerOptionsType | HandlerType,
  handler: HandlerType | null | undefined
) => CancelableType;
type RegularRequestOptionsType = {
  domain?: DomainMatcher | null | undefined;
  fireAndForget?: false;
  timeout?: number | null | undefined;
};
type FireAndForgetRequestOptionsType = {
  domain?: DomainMatcher | null | undefined;
  fireAndForget: true;
  timeout?: number | null | undefined;
};
export type RequestOptionsType =
  | RegularRequestOptionsType
  | FireAndForgetRequestOptionsType;
export type ResponseMessageEvent = {
  source: CrossDomainWindowType;
  origin: string;
  data: Record<string, any>;
};
type RegularSendType = (
  win: CrossDomainWindowType | ProxyWindow,
  name: string,
  data?: Record<string, any>,
  options?: RegularRequestOptionsType
) => ZalgoPromise<ResponseMessageEvent>;
type FireAndForgetSendType = (
  win: CrossDomainWindowType | ProxyWindow,
  name: string,
  data?: Record<string, any>,
  options?: FireAndForgetRequestOptionsType
) => ZalgoPromise<void>;
export type SendType = RegularSendType & FireAndForgetSendType;
export type MessageEvent = {
  source: CrossDomainWindowType;
  origin: string;
  data: string;
};
// eslint-disable-next-line flowtype/require-exact-type
export type CrossDomainFunctionType<A, R> = {
  (...args: A): ZalgoPromise<R>;
  fireAndForget: (...args: A) => ZalgoPromise<void>;
  __id__?: string;
  __name__?: string;
};
export type ReceiveMessageType = (
  arg0: MessageEvent,
  arg1: {
    on: OnType;
    send: SendType;
  }
) => void;
