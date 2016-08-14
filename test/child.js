
import './common';
import postRobot from 'src/index';

window.postRobot = postRobot;

postRobot.on('sendMessageToParent', function(source, data) {
    return postRobot.sendToParent(data.messageName, data.data);
});

postRobot.on('setupListener', function(source, data) {
    postRobot.once(data.messageName, function() {
        return data.handler ? data.handler() : data.data;
    });
});

postRobot.on('waitForMessage', function(source, data) {
    return postRobot.once(data.messageName, function() {
        return data.handler ? data.handler() : data.data;
    });
});