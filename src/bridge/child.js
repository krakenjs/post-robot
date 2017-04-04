
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { CONSTANTS } from '../conf';
import { isSameDomain, getOpener, getParent, getFrames, util, getFrameByName, weakMapMemoize } from '../lib';
import { receiveMessage } from '../drivers';
import { send } from '../interface';

import { needsBridge, registerRemoteWindow, rejectRemoteSendMessage, registerRemoteSendMessage, getBridgeName } from './common';

let awaitRemoteBridgeForWindow = weakMapMemoize(win => {
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
});

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

        return awaitRemoteBridgeForWindow(opener).then(bridge => {

            if (!bridge) {
                return rejectRemoteSendMessage(opener, new Error(`Can not register with opener: no bridge found in opener`));
            }

            if (!window.name) {
                return rejectRemoteSendMessage(opener, new Error(`Can not register with opener: window does not have a name`));
            }

            let bridgeParent = getParent(bridge);

            if (!bridgeParent) {
                return rejectRemoteSendMessage(opener, new Error(`Can not register with opener: bridge does not have a parent`));
            }

            return send(bridge, CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL_TO_PARENT, {

                name: window.name,

                sendMessage(origin, message) {

                    if (!window || window.closed) {
                        return;
                    }

                    receiveMessage({
                        data:   message,
                        origin,
                        source: bridgeParent
                    });
                }

            }, { domain: util.getDomain() }).then(({ data }) => {

                registerRemoteSendMessage(bridgeParent, data.origin, function(message) {
                    return data.sendMessage.apply(this, arguments);
                });

            }).catch(err => {

                rejectRemoteSendMessage(opener, err);
                throw err;
            });
        });
    });
}
