import type {
  CrossDomainWindowType,
  DomainMatcher,
} from "@krakenjs/cross-domain-utils/dist/esm";

import { initHello } from "./lib";
import {
  listenForMessages,
  stopListenForMessages,
  setupGlobalReceiveMessage,
  cancelResponseListeners,
} from "./drivers";
import { getGlobal, deleteGlobal } from "./global";
import { on, send } from "./public";
import {
  serializeMessage as internalSerializeMessage,
  deserializeMessage as internalDeserializeMessage,
  ProxyWindow,
} from "./serialize";

export function serializeMessage<T>(
  destination: CrossDomainWindowType | ProxyWindow,
  domain: DomainMatcher,
  obj: T
): string {
  return internalSerializeMessage(destination, domain, obj, {
    on,
    send,
  });
}

export function deserializeMessage<T>(
  source: CrossDomainWindowType | ProxyWindow,
  origin: string,
  message: string
): T {
  return internalDeserializeMessage(source, origin, message, {
    on,
    send,
  });
}

export function createProxyWindow(win?: CrossDomainWindowType): ProxyWindow {
  return new ProxyWindow({
    send,
    win,
  });
}

export function toProxyWindow(
  win: CrossDomainWindowType | ProxyWindow
): ProxyWindow {
  return ProxyWindow.toProxyWindow(win, {
    send,
  });
}

export function setup() {
  if (!getGlobal().initialized) {
    getGlobal().initialized = true;

    setupGlobalReceiveMessage({
      on,
      send,
    });
    listenForMessages({
      on,
      send,
    });

    initHello({
      on,
      send,
    });
  }
}

export function destroy() {
  cancelResponseListeners();
  stopListenForMessages();
  deleteGlobal();
}