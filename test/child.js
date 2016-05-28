
import postRobot from 'src/index';

window.console.karma = function() {
    var karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    karma.log('debug', arguments);
    console.log.apply(console, arguments);
};

postRobot.on('sendMessageToParent', function(source, data) {
    return postRobot.sendToParent(data.messageName, data.data);
});

postRobot.on('setupListener', function(source, data) {
    postRobot.once(data.messageName, function() {
        return data.data;
    });
});

postRobot.on('waitForMessage', function(source, data) {
    return postRobot.once(data.messageName, function() {
        return data.data;
    });
});