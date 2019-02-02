/* @flow */

import { isSameDomain, isSameTopWindow, isActuallySameDomain, getActualDomain,
    getDomain, type CrossDomainWindowType, type DomainMatcher, PROTOCOL } from 'cross-domain-utils/src';

import { SEND_STRATEGY, WILDCARD } from '../../conf';
import { needsGlobalMessagingForBrowser } from '../../lib';
import { getGlobal } from '../../global';
import { sendBridgeMessage, needsBridgeForBrowser, isBridge } from '../../bridge';

export const SEND_MESSAGE_STRATEGIES = {};

SEND_MESSAGE_STRATEGIES[SEND_STRATEGY.POST_MESSAGE] = (win : CrossDomainWindowType, serializedMessage : string, domain : DomainMatcher) => {

    if (__TEST__) {
        if (needsGlobalMessagingForBrowser() && isSameTopWindow(window, win) === false) {
            return;
        }
    }

    let domains;

    if (Array.isArray(domain)) {
        domains = domain;
    } else if (typeof domain === 'string') {
        domains = [ domain ];
    } else {
        domains = [ WILDCARD ];
    }

    domains = domains.map(dom => {

        if (dom.indexOf(PROTOCOL.MOCK) === 0) {

            if (window.location.protocol === PROTOCOL.FILE) {
                return WILDCARD;
            }

            if (!isActuallySameDomain(win)) {
                throw new Error(`Attempting to send messsage to mock domain ${ dom }, but window is actually cross-domain`);
            }

            // $FlowFixMe
            return getActualDomain(win);
        }

        if (dom.indexOf(PROTOCOL.FILE) === 0) {
            return WILDCARD;
        }

        return dom;
    });

    domains.forEach(dom => {
        win.postMessage(serializedMessage, dom);
    });
};

if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {

    SEND_MESSAGE_STRATEGIES[SEND_STRATEGY.BRIDGE] = (win : CrossDomainWindowType, serializedMessage : string, domain : string) => {

        if (!needsBridgeForBrowser() && !isBridge()) {
            return;
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
            return;
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
