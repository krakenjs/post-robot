/* @flow */

import { MESSAGE_TYPE, MESSAGE_ACK } from '../conf';

export type RequestMessage = {|
    type : typeof MESSAGE_TYPE.REQUEST,
    name : string,
    hash : string,
    data : mixed,
    fireAndForget? : boolean
|};

export type AckResponseMessage = {|
    type : typeof MESSAGE_TYPE.ACK,
    ack : $Values<typeof MESSAGE_ACK>,
    name : string,
    hash : string
|};

export type SuccessResponseMessage = {|
    type : typeof MESSAGE_TYPE.RESPONSE,
    ack : typeof MESSAGE_ACK.SUCCESS,
    name : string,
    hash : string,
    data : mixed
|};

export type ErrorResponseMessage = {|
    type : typeof MESSAGE_TYPE.RESPONSE,
    ack : typeof MESSAGE_ACK.ERROR,
    name : string,
    hash : string,
    error : mixed
|};

export type Message = RequestMessage | AckResponseMessage | SuccessResponseMessage | ErrorResponseMessage;
