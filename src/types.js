/* @flow */

import type { ZalgoPromise } from 'zalgo-promise/src';
import type { CrossDomainWindowType, DomainMatcher } from 'cross-domain-utils/src';

import type { ProxyWindow } from './serialize/window';

// export something to force webpack to see this as an ES module
export const TYPES = true;

// eslint-disable-next-line flowtype/require-exact-type
export type CancelableType = {
    cancel : () => void
};

export type ErrorHandlerType = (err : mixed) => void;

export type HandlerType = ({|
    source : CrossDomainWindowType,
    origin : string,
    data : any // eslint-disable-line flowtype/no-weak-types
|}) => (void | any | ZalgoPromise<any>); // eslint-disable-line flowtype/no-weak-types

export type ServerOptionsType = {|
    handler? : ?HandlerType,
    errorHandler? : ?ErrorHandlerType,
    window? : CrossDomainWindowType | ProxyWindow,
    name? : ?string,
    domain? : ?DomainMatcher,
    once? : ?boolean,
    errorOnClose? : ?boolean
|};

export type OnType = (
    name : string,
    options : ServerOptionsType | HandlerType,
    handler : ?HandlerType
) => CancelableType;

type RegularRequestOptionsType = {|
    domain? : ?DomainMatcher,
    fireAndForget? : false,
    timeout? : ?number
|};

type FireAndForgetRequestOptionsType = {|
    domain? : ?DomainMatcher,
    fireAndForget : true,
    timeout? : ?number
|};

export type RequestOptionsType = RegularRequestOptionsType | FireAndForgetRequestOptionsType;

export type ResponseMessageEvent = {|
    source : CrossDomainWindowType,
    origin : string,
    data : Object
|};

type RegularSendType = (
    win : CrossDomainWindowType | ProxyWindow,
    name : string,
    data : ?Object,
    options? : RegularRequestOptionsType
) => ZalgoPromise<ResponseMessageEvent>;

type FireAndForgetSendType = (
    win : CrossDomainWindowType | ProxyWindow,
    name : string,
    data : ?Object,
    options? : FireAndForgetRequestOptionsType
) => ZalgoPromise<void>;

export type SendType = RegularSendType & FireAndForgetSendType;

export type MessageEvent = {|
    source : CrossDomainWindowType,
    origin : string,
    data : string
|};

// eslint-disable-next-line flowtype/require-exact-type
export type CrossDomainFunctionType<A, R> = {
    (...args : A) : ZalgoPromise<R>,
    fireAndForget : (...args : A) => ZalgoPromise<void>,
    __id__? : string,
    __name__? : string
};

export type ReceiveMessageType = (MessageEvent, {| on : OnType, send : SendType |}) => void;
