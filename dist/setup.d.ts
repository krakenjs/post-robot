import type { CrossDomainWindowType, DomainMatcher } from 'cross-domain-utils';
import { ProxyWindow } from './serialize';
export declare function serializeMessage<T>(destination: CrossDomainWindowType | ProxyWindow, domain: DomainMatcher, obj: T): string;
export declare function deserializeMessage<T extends unknown>(source: CrossDomainWindowType | ProxyWindow, origin: string, message: string): T;
export declare function createProxyWindow(win?: CrossDomainWindowType): ProxyWindow;
export declare function toProxyWindow(win: CrossDomainWindowType | ProxyWindow): ProxyWindow;
export declare function setup(): void;
export declare function destroy(): void;
