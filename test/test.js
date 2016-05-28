
function createIframe(name) {
    var frame = document.createElement('iframe');
    frame.src = '/base/test/' + name;
    document.body.appendChild(frame);
    return frame.contentWindow;
}

var child = createIframe('child.htm');

describe('post-robot', function(){

    it('should set up a simple server and listen for a request', function(done) {

        postRobot.on('foo', function() {
            done();
        });

        postRobot.send(child, 'sendMessageToParent', {
            messageName: 'foo'
        });
    });
});
