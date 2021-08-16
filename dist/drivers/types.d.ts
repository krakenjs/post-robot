import { $Values } from 'utility-types';
import { MESSAGE_TYPE, MESSAGE_ACK } from '../conf';
export declare type RequestMessage = {
    id: string;
    origin: string;
    type: typeof MESSAGE_TYPE.REQUEST;
    name: string;
    hash: string;
    data: unknown;
    fireAndForget?: boolean;
};
export declare type AckResponseMessage = {
    id: string;
    origin: string;
    type: typeof MESSAGE_TYPE.ACK;
    name: string;
    hash: string;
};
export declare type ResponseMessage = {
    id: string;
    origin: string;
    type: typeof MESSAGE_TYPE.RESPONSE;
    ack: $Values<typeof MESSAGE_ACK>;
    name: string;
    hash: string;
    data: unknown | null | undefined;
    error: unknown | null | undefined;
};
export declare type Message = RequestMessage | AckResponseMessage | ResponseMessage;
export declare type PackedMessages = {
    [key in typeof __POST_ROBOT__.__GLOBAL_KEY__]?: ReadonlyArray<Message>;
};
