/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { getParent, isWindowClosed, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { noop, uniqueID } from 'belter/src';

import { MESSAGE_NAME, WILDCARD } from '../conf';
import { global, globalStore } from '../global';

/*
    HERE BE DRAGONS

    Warning: this file may look weird. Why save the tunnel window in an Object
    by ID, then look it up later, rather than just using the reference from the closure scope?

    The reason is, that ends up meaning the garbage collector can never get its hands
    on a closed window, since our closure has continued access to it -- and post-robot
    has no good way to know whether to clean up the function with the closure scope.

    If you're editing this file, be sure to run significant memory / GC tests afterwards.
*/

let tunnelWindows = globalStore('tunnelWindows');

function cleanTunnelWindows() {
    for (let key of tunnelWindows.keys()) {
        let tunnelWindow = tunnelWindows[key];

        try {
            noop(tunnelWindow.source);
        } catch (err) {
            tunnelWindows.del(key);
            continue;
        }

        if (isWindowClosed(tunnelWindow.source)) {
            tunnelWindows.del(key);
        }
    }
}

type TunnelWindowDataType = {
    name : string,
    source : CrossDomainWindowType,
    canary : () => void,
    sendMessage : (message : string) => void
};

function addTunnelWindow({ name, source, canary, sendMessage } : TunnelWindowDataType) : string {
    cleanTunnelWindows();
    let id = uniqueID();
    tunnelWindows.set(id, { name, source, canary, sendMessage });
    return id;
}

global.openTunnelToParent = function openTunnelToParent({ name, source, canary, sendMessage } : TunnelWindowDataType) : ZalgoPromise<{ source : CrossDomainWindowType, origin : string, data : Object }> {

    let parentWindow = getParent(window);

    if (!parentWindow) {
        throw new Error(`No parent window found to open tunnel to`);
    }

    let id = addTunnelWindow({ name, source, canary, sendMessage });

    return global.send(parentWindow, MESSAGE_NAME.OPEN_TUNNEL, {

        name,

        sendMessage() {

            let tunnelWindow = tunnelWindows.get(id);

            try {
                // IE gets antsy if you try to even reference a closed window
                noop(tunnelWindow && tunnelWindow.source);
            } catch (err) {
                tunnelWindows.del(id);
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

    }, { domain: WILDCARD });
};
