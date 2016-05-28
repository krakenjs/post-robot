
window.console.karma = function() {
    var karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    karma.log('debug', arguments);
    console.log.apply(console, arguments);
};

function createIframe(name) {
    var frame = document.createElement('iframe');
    frame.src = '/base/test/' + name;
    document.body.appendChild(frame);
    return frame.contentWindow;
}

var child = createIframe('child.htm');

describe('post-robot', function() {

    it('should set up a simple server and listen for a request', function(done) {

        postRobot.on('foobu', function() {
            done();
        });

        postRobot.send(child, 'sendMessageToParent', {
            messageName: 'foobu'
        });
    });

    it('should message a child and expect a response', function() {

        return postRobot.send(child, 'setupListener', {

            messageName: 'foo',
            data: {
                foo: 'bar'
            }

        }).then(function() {

            return postRobot.send(child, 'foo').then(function(data) {
                assert.equal(data.foo, 'bar');
            });
        });
    });

    it('should message a child and expect a response with a callback', function(done) {

        postRobot.send(child, 'setupListener', {

            messageName: 'foo',
            data: {
                foo: 'bar2'
            }

        }).then(function() {

            return postRobot.send(child, 'foo', function(err, data) {
                assert.equal(data.foo, 'bar2');
                done();
            });

        }).catch(done);
    });

    it('should get an error when messaging with an unknown name', function() {

        return postRobot.send(child, 'doesntexist').then(function(data) {
            throw new Error('Expected success handler to not be called');
        }, function(err) {
            assert.ok(err);
        });
    });

    it('should get a callback error when messaging with an unknown name', function(done) {

        postRobot.send(child, 'doesntexist', function(err, data) {
            assert.ok(err);
            if (data) {
                throw new Error('Expected data to be blank');
            }
            done();
        });
    });

    it('should pass a function across windows and be able to call it later', function(done) {

        postRobot.send(child, 'setupListener', {

            messageName: 'foo',
            data: {
                done: done
            }

        }).then(function() {

            return postRobot.send(child, 'foo').then(function(data) {

                console.karma(data);
                data.done();
            });
        });
    });

});
