/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { isSameDomain, getOpener, getFrames, getDomain, getFrameByName, type CrossDomainWindowType } from 'cross-domain-utils/src';

import { CONSTANTS } from '../conf';
import { weakMapMemoize, noop } from '../lib';
import { global } from '../global';

import { needsBridge, registerRemoteWindow, rejectRemoteSendMessage, registerRemoteSendMessage, getBridgeName } from './common';

let awaitRemoteBridgeForWindow = weakMapMemoize((win : CrossDomainWindowType) : ZalgoPromise<?CrossDomainWindowType> => {
    return ZalgoPromise.try(() => {
        for (let frame of getFrames(win)) {
            try {
                // $FlowFixMe
                if (frame && frame !== window && isSameDomain(frame) && frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                    return frame;
                }

            } catch (err) {
                continue;
            }
        }

        try {
            let frame = getFrameByName(win, getBridgeName(getDomain()));

            if (!frame) {
                return;
            }

            // $FlowFixMe
            if (isSameDomain(frame) && frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                return frame;
            }

            return new ZalgoPromise(resolve => {

                let interval;
                let timeout;

                interval = setInterval(() => {
                    // $FlowFixMe
                    if (frame && isSameDomain(frame) && frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                        clearInterval(interval);
                        clearTimeout(timeout);
                        return resolve(frame);
                    }
                }, 100);

                timeout = setTimeout(() => {
                    clearInterval(interval);
                    return resolve();
                }, 2000);
            });

        } catch (err) {
            // pass
        }
    });
});

export function openTunnelToOpener() : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {

        const opener = getOpener(window);

        if (!opener) {
            return;
        }

        if (!needsBridge({ win: opener })) {
            return;
        }

        registerRemoteWindow(opener);

        return awaitRemoteBridgeForWindow(opener).then(bridge => {

            if (!bridge) {
                return rejectRemoteSendMessage(opener, new Error(`Can not register with opener: no bridge found in opener`));
            }

            if (!window.name) {
                return rejectRemoteSendMessage(opener, new Error(`Can not register with opener: window does not have a name`));
            }

            return bridge[CONSTANTS.WINDOW_PROPS.POSTROBOT].openTunnelToParent({

                name: window.name,

                source: window,

                canary() {
                    // pass
                },

                sendMessage(message) {

                    try {
                        noop(window);
                    } catch (err) {
                        return;
                    }

                    if (!window || window.closed) {
                        return;
                    }

                    try {
                        global.receiveMessage({
                            data:   message,
                            origin: this.origin,
                            source: this.source
                        });
                    } catch (err) {
                        ZalgoPromise.reject(err);
                    }
                }

            }).then(({ source, origin, data }) => {

                if (source !== opener) {
                    throw new Error(`Source does not match opener`);
                }

                registerRemoteSendMessage(source, origin, data.sendMessage);

            }).catch(err => {

                rejectRemoteSendMessage(opener, err);
                throw err;
            });
        });
    });
}
