import type { CrossDomainWindowType, DomainMatcher } from 'cross-domain-utils';

import { initHello } from './lib';
import {
    listenForMessages,
    stopListenForMessages,
    receiveMessage,
    setupGlobalReceiveMessage,
    cancelResponseListeners
} from './drivers';
import { getGlobal, deleteGlobal } from './global';
import { on, send } from './public';
import { setupBridge } from './bridge';
import {
    serializeMessage as internalSerializeMessage,
    deserializeMessage as internalDeserializeMessage,
    ProxyWindow
} from './serialize';

export function serializeMessage<T>(
    destination: CrossDomainWindowType | ProxyWindow,
    domain: DomainMatcher,
    obj: T
): string {
    return internalSerializeMessage(destination, domain, obj, {
        on,
        send
    });
}
export function deserializeMessage<T extends unknown>(
    source: CrossDomainWindowType | ProxyWindow,
    origin: string,
    message: string
): T {
    return internalDeserializeMessage(source, origin, message, {
        on,
        send
    });
}
export function createProxyWindow(win?: CrossDomainWindowType): ProxyWindow {
    return new ProxyWindow({
        send,
        win
    });
}
export function toProxyWindow(
    win: CrossDomainWindowType | ProxyWindow
): ProxyWindow {
    return ProxyWindow.toProxyWindow(win, {
        send
    });
}
export function setup(): void {
    if (!getGlobal().initialized) {
        getGlobal().initialized = true;
        setupGlobalReceiveMessage({
            on,
            send
        });
        listenForMessages({
            on,
            send
        });

        if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
            setupBridge({
                on,
                send,
                receiveMessage
            });
        }

        initHello({
            on,
            send
        });
    }
}
export function destroy(): void {
    cancelResponseListeners();
    stopListenForMessages();
    deleteGlobal();
}
