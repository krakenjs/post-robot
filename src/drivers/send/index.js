/* @flow */

import { isWindowClosed, getDomain, type CrossDomainWindowType, type DomainMatcher } from 'cross-domain-utils/src';
import { uniqueID, stringifyError } from 'belter/src';

import { serializeMessage } from '../../serialize';
import type { Message } from '../types';
import type { OnType, SendType } from '../../types';

import { SEND_MESSAGE_STRATEGIES } from './strategies';

export function sendMessage(win : CrossDomainWindowType, domain : DomainMatcher, message : Message, { on, send } : { on : OnType, send : SendType }) {
    if (isWindowClosed(win)) {
        throw new Error('Window is closed');
    }
    
    const serializedMessage = serializeMessage(win, domain, {
        [ __POST_ROBOT__.__GLOBAL_KEY__ ]: {
            id:     uniqueID(),
            origin: getDomain(window),
            ...message
        }
    }, { on, send });

    const strategies = Object.keys(SEND_MESSAGE_STRATEGIES);
    const errors = [];

    for (const strategyName of strategies) {
        try {
            SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
        } catch (err) {
            errors.push(err);
        }
    }

    if (errors.length === strategies.length) {
        throw new Error(`All post-robot messaging strategies failed:\n\n${ errors.map((err, i) => `${ i }. ${ stringifyError(err) }`).join('\n\n') }`);
    }
}
