import { ZalgoPromise } from 'zalgo-promise/src';
import { isSameDomain, getOpener, getDomain, getFrameByName } from 'cross-domain-utils/src';
import { weakMapMemoize, noop } from 'belter/src';

import { WINDOW_PROP } from '../conf';
import { global } from '../global';

import { needsBridge, registerRemoteWindow, rejectRemoteSendMessage, registerRemoteSendMessage, getBridgeName } from './common';

var awaitRemoteBridgeForWindow = weakMapMemoize(function (win) {
    return ZalgoPromise['try'](function () {
        try {
            var frame = getFrameByName(win, getBridgeName(getDomain()));

            if (!frame) {
                return;
            }

            // $FlowFixMe
            if (isSameDomain(frame) && frame[WINDOW_PROP.POSTROBOT]) {
                return frame;
            }

            return new ZalgoPromise(function (resolve) {

                var interval = void 0;
                var timeout = void 0;

                interval = setInterval(function () {
                    // $FlowFixMe
                    if (frame && isSameDomain(frame) && frame[WINDOW_PROP.POSTROBOT]) {
                        clearInterval(interval);
                        clearTimeout(timeout);
                        return resolve(frame);
                    }
                }, 100);

                timeout = setTimeout(function () {
                    clearInterval(interval);
                    return resolve();
                }, 2000);
            });
        } catch (err) {
            // pass
        }
    });
});

export function openTunnelToOpener() {
    return ZalgoPromise['try'](function () {

        var opener = getOpener(window);

        if (!opener) {
            return;
        }

        if (!needsBridge({ win: opener })) {
            return;
        }

        registerRemoteWindow(opener);

        return awaitRemoteBridgeForWindow(opener).then(function (bridge) {

            if (!bridge) {
                return rejectRemoteSendMessage(opener, new Error('Can not register with opener: no bridge found in opener'));
            }

            if (!window.name) {
                return rejectRemoteSendMessage(opener, new Error('Can not register with opener: window does not have a name'));
            }

            return bridge[WINDOW_PROP.POSTROBOT].openTunnelToParent({

                name: window.name,

                source: window,

                canary: function canary() {
                    // pass
                },
                sendMessage: function sendMessage(message) {

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
                            data: message,
                            origin: this.origin,
                            source: this.source
                        });
                    } catch (err) {
                        ZalgoPromise.reject(err);
                    }
                }
            }).then(function (_ref) {
                var source = _ref.source,
                    origin = _ref.origin,
                    data = _ref.data;


                if (source !== opener) {
                    throw new Error('Source does not match opener');
                }

                registerRemoteSendMessage(source, origin, data.sendMessage);
            })['catch'](function (err) {

                rejectRemoteSendMessage(opener, err);
                throw err;
            });
        });
    });
}