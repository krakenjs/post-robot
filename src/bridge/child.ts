import { ZalgoPromise } from 'zalgo-promise/src';
import type { CrossDomainWindowType } from 'cross-domain-utils';
import {
    isSameDomain,
    getOpener,
    getDomain,
    getFrameByName,
    assertSameDomain
} from 'cross-domain-utils';
import { noop } from 'belter';

import { getGlobal, windowStore } from '../global';
import type { OnType, SendType, ReceiveMessageType, ResponseMessageEvent } from '../types';

import {
    needsBridge,
    registerRemoteWindow,
    rejectRemoteSendMessage,
    registerRemoteSendMessage,
    getBridgeName
} from './common';

function awaitRemoteBridgeForWindow(
    win: CrossDomainWindowType
): ZalgoPromise<CrossDomainWindowType | null | undefined> {
    return windowStore<ZalgoPromise<CrossDomainWindowType | null | undefined>>('remoteBridgeAwaiters').getOrSet(win, () => {
        return ZalgoPromise.try(() => {
            const frame = getFrameByName(win, getBridgeName(getDomain()));

            if (!frame) {
                return;
            }

            if (isSameDomain(frame) && getGlobal(assertSameDomain(frame))) {
                return frame;
            }

            return new ZalgoPromise((resolve) => {
                let interval: any;
                let timeout: any; // eslint-disable-line prefer-const

                interval = setInterval(() => { // eslint-disable-line prefer-const
                    if (
                        frame &&
                        isSameDomain(frame) &&
                        getGlobal(assertSameDomain(frame))
                    ) {
                        clearInterval(interval);
                        clearTimeout(timeout);
                        return resolve(frame);
                    }
                }, 100);
                timeout = setTimeout(() => {
                    clearInterval(interval);
                    // @ts-ignore
                    return resolve();
                }, 2000);
            });
        });
    });
}

export function openTunnelToOpener({
    on,
    send,
    receiveMessage
}: {
    on: OnType;
    send: SendType;
    receiveMessage: ReceiveMessageType;
}): ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        const opener = getOpener(window);

        if (
            !opener ||
            !needsBridge({
                win: opener
            })
        ) {
            return;
        }

        registerRemoteWindow(opener);
        return awaitRemoteBridgeForWindow(opener).then((bridge) => {
            if (!bridge) {
                return rejectRemoteSendMessage(
                    opener,
                    new Error(
                        `Can not register with opener: no bridge found in opener`
                    )
                );
            }

            if (!window.name) {
                return rejectRemoteSendMessage(
                    opener,
                    new Error(
                        `Can not register with opener: window does not have a name`
                    )
                );
            }

            return getGlobal(assertSameDomain(bridge))
                .openTunnelToParent({
                    name:  window.name,
                    source:window,

                    canary() {
                        // pass
                    },

                    sendMessage(message: string) {
                        try {
                            noop(window);
                        } catch (err) {
                            return;
                        }

                        if (!window || window.closed) {
                            return;
                        }

                        try {
                            receiveMessage(
                                {
                                    data:  message,
                                    // @ts-ignore
                                    origin:this.origin,
                                    // @ts-ignore
                                    source:this.source
                                },
                                {
                                    on,
                                    send
                                }
                            );
                        } catch (err) {
                            ZalgoPromise.reject(err);
                        }
                    }
                })
                .then(({ source, origin, data }: ResponseMessageEvent) => {
                    if (source !== opener) {
                        throw new Error(`Source does not match opener`);
                    }

                    registerRemoteSendMessage(source, origin, data.sendMessage);
                })
                .catch((err: Error) => {
                    rejectRemoteSendMessage(opener, err);
                    throw err;
                });
        });
    });
}
