import { $Values } from 'utility-types';
import type { CrossDomainWindowType } from 'cross-domain-utils';
import { SEND_STRATEGY } from '../../conf';
declare type SendStrategies = Record<$Values<typeof SEND_STRATEGY>, (arg0: CrossDomainWindowType, arg1: string, arg2: string) => void>;
export declare const SEND_MESSAGE_STRATEGIES: Partial<SendStrategies>;
export {};
