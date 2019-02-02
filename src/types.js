/* @flow */

import type { ZalgoPromise } from 'zalgo-promise/src';
import type { CrossDomainWindowType, DomainMatcher } from 'cross-domain-utils/src';

// export something to force webpack to see this as an ES module
export const TYPES = true;

// eslint-disable-next-line flowtype/require-exact-type
export type CancelableType = {
    cancel : () => void
};

export type ErrorHandlerType = (err : mixed) => void;

export type HandlerType = ({
    source : CrossDomainWindowType,
    origin : string,
    data : any // eslint-disable-line flowtype/no-weak-types
}) => (void | any | ZalgoPromise<any>); // eslint-disable-line flowtype/no-weak-types

export type ServerOptionsType = {|
    handler? : ?HandlerType,
    errorHandler? : ?ErrorHandlerType,
    window? : CrossDomainWindowType,
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

export type RequestOptionsType = {|
    domain? : ?DomainMatcher,
    fireAndForget? : ?boolean,
    timeout? : ?number
|};

export type ResponseMessageEvent = {|
    source : CrossDomainWindowType,
    origin : string,
    data : Object
|};

export type SendType = (
    win : CrossDomainWindowType,
    name : string,
    data : ?Object,
    options? : RequestOptionsType
) => ZalgoPromise<ResponseMessageEvent>;

export type MessageEvent = {|
    source : CrossDomainWindowType,
    origin : string,
    data : string
|};

export type ReceiveMessageType = (MessageEvent, { on : OnType, send : SendType }) => void;
