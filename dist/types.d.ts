import type { ZalgoPromise } from 'zalgo-promise';
import type { CrossDomainWindowType, DomainMatcher } from 'cross-domain-utils';
export declare const TYPES = true;
export declare type CancelableType = {
    cancel: () => void;
};
export declare type ErrorHandlerType = (err: unknown) => void;
export declare type HandlerType = (arg0: {
    source: CrossDomainWindowType;
    origin: string;
    data: any;
}) => void | any | ZalgoPromise<any>;
export declare type ServerOptionsType = {
    handler?: HandlerType | null | undefined;
    errorHandler?: ErrorHandlerType | null | undefined;
    window?: CrossDomainWindowType;
    name?: string | null | undefined;
    domain?: DomainMatcher | null | undefined;
    once?: boolean | null | undefined;
    errorOnClose?: boolean | null | undefined;
};
export declare type OnType = (name: string, options: ServerOptionsType | HandlerType, handler?: HandlerType | null | undefined) => CancelableType;
declare type RegularRequestOptionsType = {
    domain?: DomainMatcher | null | undefined;
    fireAndForget?: false;
    timeout?: number | null | undefined;
};
declare type FireAndForgetRequestOptionsType = {
    domain?: DomainMatcher | null | undefined;
    fireAndForget: true;
    timeout?: number | null | undefined;
};
export declare type RequestOptionsType = RegularRequestOptionsType | FireAndForgetRequestOptionsType;
export declare type ResponseMessageEvent = {
    source: CrossDomainWindowType;
    origin: string;
    data: Record<string, any>;
};
declare type RegularSendType = (win: CrossDomainWindowType, name: string, data?: Record<string, any> | null | undefined, options?: RegularRequestOptionsType) => ZalgoPromise<ResponseMessageEvent>;
declare type FireAndForgetSendType = (win: CrossDomainWindowType, name: string, data?: Record<string, any> | null | undefined, options?: FireAndForgetRequestOptionsType) => ZalgoPromise<void>;
export declare type SendType = RegularSendType & FireAndForgetSendType;
export declare type MessageEvent = {
    source: CrossDomainWindowType;
    origin: string;
    data: string;
};
export declare type CrossDomainFunctionType<A, R> = {
    (...args: Array<A>): ZalgoPromise<R>;
    fireAndForget: (...args: Array<A>) => ZalgoPromise<void>;
    __id__?: string;
    __name__?: string;
};
export declare type ReceiveMessageType = (arg0: MessageEvent, arg1: {
    on: OnType;
    send: SendType;
}) => void;
export {};
