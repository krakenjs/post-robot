
import { enableIE8Mode } from './common';
import postRobot from 'src/index';

window.postRobot = postRobot;

postRobot.on('sendMessageToParent', function({ source, data }) {
    return postRobot.sendToParent(data.messageName, data.data)
        .then(({ data }) => data);
});

postRobot.on('setupListener', function({ source, data }) {
    postRobot.once(data.messageName, function() {
        return data.handler ? data.handler() : data.data;
    }).then(({ data }) => data);
});

postRobot.on('enableIE8Mode', function({ source, data }) {
    let ie8mode = enableIE8Mode()

    return postRobot.openTunnelToOpener().then(() => {
        return ie8mode;
    });
});

postRobot.on('waitForMessage', function({ source, data }) {
    return postRobot.once(data.messageName, function() {
        return data.handler ? data.handler() : data.data;
    }).then(({ data }) => data);
});