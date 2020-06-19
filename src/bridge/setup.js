/* @flow */

import type { OnType, SendType, ReceiveMessageType } from '../types';

import { listenForWindowOpen, listenForOpenTunnel } from './parent';
import { setupOpenTunnelToParent } from './bridge';
import { openTunnelToOpener } from './child';

export function setupBridge({ on, send, receiveMessage } : {| on : OnType, send : SendType, receiveMessage : ReceiveMessageType |}) {
    listenForWindowOpen();
    listenForOpenTunnel({ on, send, receiveMessage });
    setupOpenTunnelToParent({ send });
    openTunnelToOpener({ on, send, receiveMessage });
}
