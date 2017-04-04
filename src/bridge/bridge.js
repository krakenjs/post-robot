
import { getBridgeName } from './common';
import { CONSTANTS } from '../conf';
import { getParent, isWindowClosed, isSameDomain, util } from '../lib';
import { send, on } from '../interface';

export function isBridge() {
    return window.name && window.name === getBridgeName(util.getDomain());
}

export function setupBridgeTunnelOpener() {
    if (isBridge()) {

        on(CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL_TO_PARENT, { domain: util.getDomain() }, ({ source, origin, data }) => {

            if (!isSameDomain(source)) {
                throw new Error(`Can not open tunnel from different domain`);
            }

            let remoteWindow = getParent(window);

            if (!remoteWindow) {
                throw new Error(`No parent window found to open tunnel to`);
            }

            return send(remoteWindow, CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {

                name: data.name,

                sendMessage(message) {
                    if (isWindowClosed(source)) {
                        return;
                    }

                    return data.sendMessage(this.origin, message);
                }

            }, { domain: CONSTANTS.WILDCARD }).then(event => {

                return {
                    origin: event.origin,
                    sendMessage: event.data.sendMessage
                };
            });
        });
    }
}
