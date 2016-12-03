
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { CONSTANTS } from '../conf';
import { isSameDomain, getOpener, getFrames, util, getFrameByName } from '../lib';
import { receiveMessage } from '../drivers';

import { needsBridge, registerRemoteWindow, rejectRemoteSendMessage, registerRemoteSendMessage, getBridgeName } from './common';

function getRemoteBridgeForWindow(win) {
    return Promise.try(() => {
        for (let frame of getFrames(win)) {
            try {
                if (frame && frame !== window && isSameDomain(frame) && frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                    return frame;
                }

            } catch (err) {
                continue;
            }
        }

        try {
            let frame = getFrameByName(win, getBridgeName(util.getDomain()));

            if (!frame) {
                return;
            }

            if (isSameDomain(frame) && frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                return frame;
            }

            return new Promise(resolve => {

                let interval;
                let timeout;

                interval = setInterval(() => {
                    if (isSameDomain(frame) && frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                        clearInterval(interval);
                        clearTimeout(timeout);
                        return resolve(frame);
                    }

                    setTimeout(() => {
                        clearInterval(interval);
                        return resolve();
                    }, 2000);
                }, 100);
            });

        } catch (err) {
            return;
        }
    });
}

export function openTunnelToOpener() {
    return Promise.try(() => {

        let opener = getOpener(window);

        if (!opener) {
            return;
        }

        if (!needsBridge({ win: opener })) {
            return;
        }

        registerRemoteWindow(opener);

        return getRemoteBridgeForWindow(opener).then(bridge => {

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

                    if (!window || window.closed) {
                        return;
                    }

                    receiveMessage({
                        data:   message,
                        origin: this.origin,
                        source: this.source
                    });
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
