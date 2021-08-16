import type { CrossDomainWindowType } from 'cross-domain-utils';
import type { SendType } from '../types';
export declare type TunnelWindowDataType = {
    name: string;
    source: CrossDomainWindowType;
    canary: () => void;
    sendMessage: (message: string) => void;
};
export declare function setupOpenTunnelToParent({ send }: {
    send: SendType;
}): void;
