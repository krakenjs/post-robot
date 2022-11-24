import type {
  CrossDomainWindowType,
  DomainMatcher,
} from "@krakenjs/cross-domain-utils";
import "@krakenjs/cross-domain-utils";
import { ZalgoPromise } from "@krakenjs/zalgo-promise";
import type {
  CustomSerializedType,
  Thenable,
} from "@krakenjs/universal-serialize";
import { serializeType } from "@krakenjs/universal-serialize";
import { SERIALIZATION_TYPE } from "../conf";
import type { OnType, SendType } from "../types";
import type { SerializedFunction } from "./function";
import { serializeFunction } from "./function";
import type { ProxyWindow } from "./window";
export type SerializedPromise = CustomSerializedType<
  typeof SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE,
  {
    then: SerializedFunction;
  }
>;
export function serializePromise(
  destination: CrossDomainWindowType | ProxyWindow,
  domain: DomainMatcher,
  val: Thenable,
  key: string,
  {
    on,
    send,
  }: {
    on: OnType;
    send: SendType;
  }
): SerializedPromise {
  return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE, {
    then: serializeFunction(
      destination,
      domain,
      (resolve, reject) => val.then(resolve, reject),
      key,
      {
        on,
        send,
      }
    ),
  });
}

export function deserializePromise<T>(
  source: CrossDomainWindowType | ProxyWindow,
  origin: string,
  {
    then,
  }: {
    then: (...args: any[]) => any;
  }
): ZalgoPromise<T> {
  return new ZalgoPromise(then);
}