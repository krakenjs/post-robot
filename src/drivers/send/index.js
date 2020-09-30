/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { isWindowClosed, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { stringifyError, noop } from 'belter/src';

import { serializeMessage } from '../../serialize';
import { windowStore, getGlobalKey } from '../../global';
import type { Message, PackedMessages } from '../types';
import type { OnType, SendType } from '../../types';

import { SEND_MESSAGE_STRATEGIES } from './strategies';

function packMessages(messages : $ReadOnlyArray<Message>) : PackedMessages {
    return {
        [ getGlobalKey() ]: messages
    };
}

export function sendMessage(win : CrossDomainWindowType, domain : string, message : Message, { on, send } : {| on : OnType, send : SendType |}) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        const messageBuffer = windowStore();

        const domainBuffer = messageBuffer.getOrSet(win, () => ({}));

        domainBuffer.buffer = domainBuffer.buffer || [];
        domainBuffer.buffer.push(message);

        domainBuffer.flush = domainBuffer.flush || ZalgoPromise.flush().then(() => {
            if (isWindowClosed(win)) {
                throw new Error('Window is closed');
            }

            const serializedMessage = serializeMessage(win, domain, packMessages(domainBuffer.buffer || []), { on, send });
            delete domainBuffer.buffer;

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
        });

        return domainBuffer.flush.then(() => {
            delete domainBuffer.flush;
        });
    }).then(noop);
}
