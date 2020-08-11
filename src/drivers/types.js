/* @flow */

import { MESSAGE_TYPE, MESSAGE_ACK } from '../conf';

export type RequestMessage = {|
    id : string,
    origin : string,
    type : typeof MESSAGE_TYPE.REQUEST,
    name : string,
    hash : string,
    data : mixed,
    fireAndForget? : boolean
|};

export type AckResponseMessage = {|
    id : string,
    origin : string,
    type : typeof MESSAGE_TYPE.ACK,
    name : string,
    hash : string
|};

export type ResponseMessage = {|
    id : string,
    origin : string,
    type : typeof MESSAGE_TYPE.RESPONSE,
    ack : $Values<typeof MESSAGE_ACK>,
    name : string,
    hash : string,
    data : ?mixed,
    error : ?mixed
|};

export type Message = RequestMessage | AckResponseMessage | ResponseMessage;

export type PackedMessages = {|
    [ typeof __POST_ROBOT__.__GLOBAL_KEY__ ] : $ReadOnlyArray<Message>
|};
