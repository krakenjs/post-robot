/* @flow */

import postRobot from '../src';

import { enableIE8Mode } from './common';

window.postRobot = postRobot;

postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = true;

postRobot.on('sendMessageToParent', ({ data }) => {
    return postRobot.sendToParent(data.messageName, data.data)
        .then((event) => event.data);
});

postRobot.on('setupListener', ({ data }) => {
    postRobot.once(data.messageName, () => {
        return data.handler ? data.handler() : data.data;
    }).then((event) => event.data);
});

postRobot.on('enableIE8Mode', () => {
    let ie8mode = enableIE8Mode();

    if (!postRobot.bridge) {
        throw new Error(`Expected postRobot.bridge to be available`);
    }

    return postRobot.bridge.openTunnelToOpener().then(() => {
        return ie8mode;
    });
});

postRobot.on('waitForMessage', ({ data }) => {
    return postRobot.once(data.messageName, () => {
        return data.handler ? data.handler() : data.data;
    }).then((event) => event.data);
});
