
window.console.karma = function() {
    var karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    karma.log('debug', arguments);
    console.log.apply(console, arguments);
};

function createIframe(name) {
    var frame = document.createElement('iframe');
    frame.src = '/base/test/' + name;
    frame.id = 'childframe';
    frame.name = Math.random().toString();
    document.body.appendChild(frame);
    return frame.contentWindow;
}

function createPopup(name) {
    var popup = window.open('/base/test/' + name, 'childPopup');
    return popup;
}

var childFrame = createIframe('child.htm');
var childWindow = createPopup('child.htm');

var otherChildFrame = createIframe('child.htm');

describe('post-robot', function() {

    it('should set up a simple server and listen for a request', function(done) {

        postRobot.on('foobu', function() {
            done();
        });

        postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'foobu'
        });
    });

    it('should message a child and expect a response', function() {

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data: {
                foo: 'bar'
            }

        }).then(function() {

            return postRobot.send(childFrame, 'foo').then(function(data) {
                assert.equal(data.foo, 'bar');
            });
        });
    });

    it('should message a child and expect a response with a callback', function(done) {

        postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data: {
                foo: 'bar2'
            }

        }).then(function() {

            return postRobot.send(childFrame, 'foo', function(err, data) {
                assert.equal(data.foo, 'bar2');
                done();
            });

        }).catch(done);
    });

    it('should get an error when messaging with an unknown name', function() {

        return postRobot.send(childFrame, 'doesntexist').then(function(data) {
            throw new Error('Expected success handler to not be called');
        }, function(err) {
            assert.ok(err);
        });
    });

    it('should get a callback error when messaging with an unknown name', function(done) {

        postRobot.send(childFrame, 'doesntexist', function(err, data) {
            assert.ok(err);
            if (data) {
                throw new Error('Expected data to be blank');
            }
            done();
        });
    });

    it('should pass a function across windows and be able to call it later', function(done) {

        postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data: {
                done: done
            }

        }).then(function() {

            return postRobot.send(childFrame, 'foo').then(function(data) {
                data.done();
            });
        });
    });

    it('should work when referencing the child by id', function() {

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data: {
                foo: 'bar'
            }

        }).then(function() {

            return postRobot.send('childframe', 'foo').then(function(data) {
                assert.equal(data.foo, 'bar');
            });
        });
    });

    it('should work with a child window', function() {

        return postRobot.send(childWindow, 'setupListener', {

            messageName: 'foo',
            data: {
                foo: 'bar'
            }

        }).then(function() {

            return postRobot.send(childWindow, 'foo').then(function(data) {
                assert.equal(data.foo, 'bar');
            });
        });
    });

    it('should be able to listen for a message only once', function() {

        var count = 0;

        postRobot.once('foobu', { override: true }, function() {
            count += 1;
        });

        return postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'foobu'
        }).then(function() {
            return postRobot.send(childFrame, 'sendMessageToParent', {
                messageName: 'foobu'
            })
        }).then(function() {
            assert.equal(count, 1);
        });
    });

    it('should error out if you try to register the same listener name twice', function() {

        postRobot.on('onceonly', function() {
            // pass
        });

        try {
            postRobot.on('onceonly', function() {
                // pass
            });
        } catch (err) {
            assert.ok(err);
            return;
        }

        throw new Error('Expected error handler to be called');
    });

    it('should allow you to register the same listener twice providing it is to different windows', function() {

        postRobot.on('onceonlywindow', { window: childFrame }, function() {
            // pass
        });

        postRobot.on('onceonlywindow', { window: otherChildFrame }, function() {
            // pass
        });
    });

    it('should allow you to register a listener for a specific window', function() {

        var count = 0;

        postRobot.on('specificchildlistener', { window: otherChildFrame }, function() {
            count += 1;
        });

        return postRobot.send(otherChildFrame, 'sendMessageToParent', {
            messageName: 'specificchildlistener'
        }).then(function() {
            return postRobot.send(childFrame, 'sendMessageToParent', {
                messageName: 'specificchildlistener'
            })
        }).then(function() {
            assert.equal(count, 1);
        });
    });
});
