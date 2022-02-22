/* @flow */

import { isSameDomain, isSameTopWindow, isActuallySameDomain, getActualDomain,
    getDomain, type CrossDomainWindowType, PROTOCOL } from 'cross-domain-utils/src';

import { SEND_STRATEGY, WILDCARD } from '../../conf';
import { needsGlobalMessagingForBrowser } from '../../lib';
import { getGlobal } from '../../global';
import { sendBridgeMessage, needsBridgeForBrowser, isBridge } from '../../bridge';

type SendStrategies = {|
    [$Values<typeof SEND_STRATEGY>] : (CrossDomainWindowType, string, string) => void
|};

export const SEND_MESSAGE_STRATEGIES : SendStrategies = {};

SEND_MESSAGE_STRATEGIES[SEND_STRATEGY.POST_MESSAGE] = (win : CrossDomainWindowType, serializedMessage : string, domain : string) => {
    if (domain.indexOf(PROTOCOL.FILE) === 0) {
        domain = WILDCARD;
    }

    if (__TEST__) {
        if (needsGlobalMessagingForBrowser() && isSameTopWindow(window, win) === false) {
            return;
        }

        if (domain.indexOf(PROTOCOL.MOCK) === 0) {
            if (!isActuallySameDomain(win)) {
                throw new Error(`Attempting to send message to mock domain ${ domain }, but window is actually cross-domain`);
            }

            // $FlowFixMe
            const windowDomain = getDomain(win);
                
            if (windowDomain !== domain) {
                throw new Error(`Mock domain target ${ domain } does not match window domain ${ windowDomain }`);
            }

            // $FlowFixMe
            domain = getActualDomain(win);

        }
    }

    win.postMessage(serializedMessage, domain);
};

if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {

    SEND_MESSAGE_STRATEGIES[SEND_STRATEGY.BRIDGE] = (win : CrossDomainWindowType, serializedMessage : string, domain : string) => {

        if (!needsBridgeForBrowser() && !isBridge()) {
            throw new Error(`Bridge not needed for browser`);
        }

        if (isSameDomain(win)) {
            throw new Error(`Post message through bridge disabled between same domain windows`);
        }

        if (isSameTopWindow(window, win) !== false) {
            throw new Error(`Can only use bridge to communicate between two different windows, not between frames`);
        }

        sendBridgeMessage(win, domain, serializedMessage);
    };
}

if (__POST_ROBOT__.__IE_POPUP_SUPPORT__ || __POST_ROBOT__.__GLOBAL_MESSAGE_SUPPORT__) {
    
    SEND_MESSAGE_STRATEGIES[SEND_STRATEGY.GLOBAL] = (win : CrossDomainWindowType, serializedMessage : string) => {

        if (!needsGlobalMessagingForBrowser()) {
            throw new Error(`Global messaging not needed for browser`);
        }

        if (!isSameDomain(win)) {
            throw new Error(`Post message through global disabled between different domain windows`);
        }

        if (isSameTopWindow(window, win) !== false) {
            throw new Error(`Can only use global to communicate between two different windows, not between frames`);
        }

        // $FlowFixMe
        const foreignGlobal = getGlobal(win);

        if (!foreignGlobal) {
            throw new Error(`Can not find postRobot global on foreign window`);
        }

        foreignGlobal.receiveMessage({
            source: window,
            origin: getDomain(),
            data:   serializedMessage
        });
    };
}
