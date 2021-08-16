import { ZalgoPromise } from 'zalgo-promise';
import type { ServerOptionsType, HandlerType, CancelableType } from '../types';
export declare function on(name: string, options: ServerOptionsType | HandlerType, handler?: HandlerType | null | undefined): CancelableType;
declare type CancelableZalgoPromise<T> = ZalgoPromise<T> & {
    cancel: () => void;
};
export declare function once(name: string, options?: ServerOptionsType | HandlerType, handler?: HandlerType): CancelableZalgoPromise<{
    source: unknown;
    origin: string;
    data: Record<string, any>;
}>;
export {};
