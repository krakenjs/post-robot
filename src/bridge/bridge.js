/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { getParent, isWindowClosed, type CrossDomainWindowType } from 'cross-domain-utils/src';

import { CONSTANTS } from '../conf';
import { noop } from '../lib';
import { global } from '../global';

/*
    HERE BE DRAGONS

    Warning: this file may look weird. Why save the tunnel window in an Object
    by ID, then look it up later, rather than just using the reference from the closure scope?

    The reason is, that ends up meaning the garbage collector can never get its hands
    on a closed window, since our closure has continued access to it -- and post-robot
    has no good way to know whether to clean up the function with the closure scope.

    If you're editing this file, be sure to run significant memory / GC tests afterwards.
*/

global.tunnelWindows = global.tunnelWindows || {};
global.tunnelWindowId = 0;

function deleteTunnelWindow(id) {

    try {
        if (global.tunnelWindows[id]) {
            delete global.tunnelWindows[id].source;
        }
    } catch (err) {
        // pass
    }

    delete global.tunnelWindows[id];
}

function cleanTunnelWindows() {
    let tunnelWindows = global.tunnelWindows;

    for (let key of Object.keys(tunnelWindows)) {
        let tunnelWindow = tunnelWindows[key];

        try {
            noop(tunnelWindow.source);
        } catch (err) {
            deleteTunnelWindow(key);
            continue;
        }

        if (isWindowClosed(tunnelWindow.source)) {
            deleteTunnelWindow(key);
        }
    }
}

type TunnelWindowDataType = {
    name : string,
    source : CrossDomainWindowType,
    canary : () => void,
    sendMessage : (message : string) => void
};

function addTunnelWindow({ name, source, canary, sendMessage } : TunnelWindowDataType) : number {
    cleanTunnelWindows();
    global.tunnelWindowId += 1;
    global.tunnelWindows[global.tunnelWindowId] = { name, source, canary, sendMessage };
    return global.tunnelWindowId;
}

function getTunnelWindow(id : number) : TunnelWindowDataType {
    return global.tunnelWindows[id];
}

global.openTunnelToParent = function openTunnelToParent({ name, source, canary, sendMessage } : TunnelWindowDataType) : ZalgoPromise<{ source : CrossDomainWindowType, origin : string, data : Object }> {

    let parentWindow = getParent(window);

    if (!parentWindow) {
        throw new Error(`No parent window found to open tunnel to`);
    }

    let id = addTunnelWindow({ name, source, canary, sendMessage });

    return global.send(parentWindow, CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {

        name,

        sendMessage() {

            let tunnelWindow = getTunnelWindow(id);

            try {
                // IE gets antsy if you try to even reference a closed window
                noop(tunnelWindow && tunnelWindow.source);
            } catch (err) {
                deleteTunnelWindow(id);
                return;
            }

            if (!tunnelWindow || !tunnelWindow.source || isWindowClosed(tunnelWindow.source)) {
                return;
            }

            try {
                tunnelWindow.canary();
            } catch (err) {
                return;
            }

            tunnelWindow.sendMessage.apply(this, arguments);
        }

    }, { domain: CONSTANTS.WILDCARD });
};
