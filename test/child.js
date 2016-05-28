
import postRobot from 'src/index';

window.console.karma = function() {
    var karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    karma.log('debug', arguments);
    console.log.apply(console, arguments);
};

postRobot.on('sendMessageToParent', function(source, data) {
    postRobot.sendToParent(data.messageName);
});

postRobot.on('setupListener', function(source, data) {
    postRobot.on(data.messageName, { override: true }, function() {
        return data.data;
    });
});