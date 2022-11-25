import type {
  CrossDomainWindowType,
  DomainMatcher,
} from "@krakenjs/cross-domain-utils/dist/esm";
import { isWindow } from "@krakenjs/cross-domain-utils/dist/esm";
import type { Thenable } from "@krakenjs/universal-serialize/dist/esm";
import {
  TYPE,
  serialize,
  deserialize,
} from "@krakenjs/universal-serialize/dist/esm";
import { SERIALIZATION_TYPE } from "../conf";
import type { OnType, SendType } from "../types";
import type { SerializedFunction } from "./function";
import { serializeFunction, deserializeFunction } from "./function";
import type { SerializedPromise } from "./promise";
import { serializePromise, deserializePromise } from "./promise";
import type { SerializedWindow } from "./window";
import { serializeWindow, deserializeWindow, ProxyWindow } from "./window";

export function serializeMessage<T>(
  destination: CrossDomainWindowType | ProxyWindow,
  domain: DomainMatcher,
  obj: T,
  {
    on,
    send,
  }: {
    on: OnType;
    send: SendType;
  }
): string {
  return serialize(obj, {
    [TYPE.PROMISE]: (val: Thenable, key: string): SerializedPromise =>
      serializePromise(destination, domain, val, key, {
        on,
        send,
      }),
    // TODO: these types are a complete mess
    [TYPE.FUNCTION]: (val: any, key: string): SerializedFunction =>
      serializeFunction(destination, domain, val, key, {
        on,
        send,
      }),
    [TYPE.OBJECT]: (
      val: CrossDomainWindowType
    ): Record<string, any> | SerializedWindow => {
      return isWindow(val) || ProxyWindow.isProxyWindow(val)
        ? serializeWindow(destination, domain, val, {
            send,
          })
        : val;
    },
  });
}

export function deserializeMessage<T>(
  source: CrossDomainWindowType | ProxyWindow,
  origin: string,
  message: string,
  {
    send,
  }: {
    on: OnType;
    send: SendType;
  }
): T {
  return deserialize(message, {
    [SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE]: (serializedPromise) =>
      deserializePromise(source, origin, serializedPromise),
    [SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION]: (serializedFunction) =>
      deserializeFunction(source, origin, serializedFunction, {
        send,
      }),
    [SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW]: (serializedWindow) =>
      deserializeWindow(source, origin, serializedWindow, {
        send,
      }),
  });
}
