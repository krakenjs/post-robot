
import { enableIE8Mode } from './common';
import postRobot from 'src/index';

import { onWindowReady, promise } from 'src/lib';

postRobot.CONFIG.LOG_TO_PAGE = true;
window.mockDomain = 'mock://test-post-robot.com';

function createIframe(name, callback) {
    var frame = document.createElement('iframe');
    frame.src = '/base/test/' + name;
    frame.id = 'childframe';
    frame.name = Math.random().toString() + '_' + name.replace(/[^a-zA-Z0-9]+/g, '_');
    frame.onload = callback;
    document.body.appendChild(frame);
    return frame.contentWindow;
}

function createPopup(name) {
    var popup = window.open('mock://test-post-robot-child.com|/base/test/' + name, Math.random().toString() + '_' + name.replace(/[^a-zA-Z0-9]+/g, '_'));
    window.focus();
    return popup;
}

let bridge;

let childWindow, childFrame, otherChildFrame, frameElement;

before(function() {
    return postRobot.openBridge('/base/test/bridge.htm', 'mock://test-post-robot-child.com').then(frame => {
        bridge = frame;
    }).then(function() {

        childWindow = createPopup('child.htm');
        childFrame = createIframe('child.htm');
        otherChildFrame = createIframe('child.htm');
        frameElement = document.getElementById('childframe');

        return promise.Promise.all([
            onWindowReady(childWindow),
            onWindowReady(childFrame),
            onWindowReady(otherChildFrame)
        ]);
    });
});

after(function() {
    document.body.removeChild(childFrame.frameElement);
    document.body.removeChild(otherChildFrame.frameElement);
    childWindow.close();
});



describe('[post-robot] happy cases', function() {

    it('should allow an iframe dom element in send function', function() {

        return postRobot.send(frameElement, 'setupListener', {

            messageName: 'foo',
            data: {
                foo: 'bar'
            }

        }).then(function() {

            return postRobot.send(frameElement, 'foo').then(function({ data }) {
                assert.equal(data.foo, 'bar');
            });
        });
    });

    it('should set up a simple server and listen for a request', function(done) {

        postRobot.on('foobu', function() {
            done();
        });

        postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'foobu'
        }).catch(done);
    });

    it('should set up a simple server and listen for multiple requests', function() {

        var count = 0;

        postRobot.on('multilistener', function() {
            count += 1;
        });

        return postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'multilistener'
        }).then(function() {
            return postRobot.send(childFrame, 'sendMessageToParent', {
                messageName: 'multilistener'
            })
        }).then(function() {
            assert.equal(count, 2);
        });
    });

    it('should message a child and expect a response', function() {

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data: {
                foo: 'bar'
            }

        }).then(function() {

            return postRobot.send(childFrame, 'foo').then(function({ data }) {
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

            return postRobot.send(childFrame, 'foo', function(err, event) {
                assert.equal(event.data.foo, 'bar2');
                done();
            });

        }).catch(done);
    });

    it('should pass a function across windows and be able to call it later', function(done) {

        postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data: {
                done: done
            }

        }).then(function() {

            return postRobot.send(childFrame, 'foo').then(function({ data }) {
                data.done();
            });
        });
    });
});


describe('[post-robot] options', function() {

    it('should work when referencing the child by id', function() {

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data: {
                foo: 'bar'
            }

        }).then(function() {

            return postRobot.send('childframe', 'foo').then(function({ data }) {
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
            }).then(function() {
                throw new Error('Expected success handler to not be called');
            }, function() {
                assert.equal(count, 1);
            });
        });
    });

    it('should be able to re-register the same once handler after the first is called', function() {

        var count = 0;

        postRobot.once('foobu', { override: true }, function({ source, data }) {
            count += data.add;
        });

        return postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'foobu',
            data: {
                add: 2
            }
        }).then(function() {

            postRobot.once('foobu', { override: true }, function({ source, data }) {
                count += data.add;
            });

            return postRobot.send(childFrame, 'sendMessageToParent', {
                messageName: 'foobu',
                data: {
                    add: 3
                }
            });

        }).then(function() {
            assert.equal(count, 5);
        });
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
            }).then(function() {
                throw new Error('Expected success handler to not be called');
            }, function(err) {
                assert.ok(err);
                assert.equal(count, 1);
            });
        });
    });
});


describe('[post-robot] error cases', function() {

    it('should get an error when messaging with an unknown name', function() {

        return postRobot.send(childFrame, 'doesntexist').then(function({ data }) {
            throw new Error('Expected success handler to not be called');
        }, function(err) {
            assert.ok(err);
        });
    });

    it('should get a callback error when messaging with an unknown name', function(done) {

        postRobot.send(childFrame, 'doesntexist', function(err, event) {
            assert.ok(err);
            if (event) {
                throw new Error('Expected event to be blank');
            }
            done();
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

    it('should fail when no post message strategies are allowed', function() {

        var allowedStrategies = postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS;

        postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS = {};

        return postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'foobu'
        }).then(function() {
            throw new Error('Expected success handler to not be called');
        }, function(err) {
            assert.ok(err);
            postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS = allowedStrategies;
        });
    });

    it('should fail messaging popup when emulating IE and only allowing post messages', function() {

        var allowedStrategies = postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS;

        postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS = {
            [ postRobot.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE ]: true
        };

        postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = false;

        return postRobot.send(childWindow, 'sendMessageToParent', {
            messageName: 'foobu'
        }).then(function() {
            throw new Error('Expected success handler to not be called');
        }, function(err) {
            assert.ok(err);
            postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = true;
            postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS = allowedStrategies;
        });
    });

    it('should fail to send a message when the expected domain does not match', function() {

        postRobot.on('foobu', { domain: 'http://www.zombo.com' }, function() {
            done();
        });

        return postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'foobu'
        }).then(function() {
            throw new Error('Expected success handler to not be called');
        }, function(err) {
            assert.ok(err);
        });
    });

    it('should fail to send a message when the target domain does not match', function() {

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data: {
                foo: 'bar'
            }

        }).then(function() {

            return postRobot.send(childFrame, 'foo', {}, { domain: 'http://www.zombo.com' }).then(function() {
                throw new Error('Expected success handler to not be called');
            }, function(err) {
                assert.ok(err instanceof Error);
            });
        });
    });

    it('should call the error handler if the target window closes', function(done) {

        let targetWindow = createPopup('child.htm');

        postRobot.on('foobar', { window: targetWindow, errorHandler: function() { done() }, errorOnClose: true }, function() {
            throw new Error('Expected handler to not be called');
        });

        setTimeout(function() {
            targetWindow.close();
        }, 100);
    });
});


describe('[post-robot] popup tests', function() {

    it('should work with a child window', function() {

        return postRobot.send(childWindow, 'setupListener', {

            messageName: 'foo',
            data: {
                foo: 'bar'
            }

        }).then(function() {

            return postRobot.send(childWindow, 'foo').then(function({ data }) {
                assert.equal(data.foo, 'bar');
            });
        });
    });

    it('should succeed messaging popup when emulating IE with all strategies enabled', function() {

        return postRobot.send(childWindow, 'enableIE8Mode').then((event) => {

            let ie8mode = enableIE8Mode();
            let remoteIE8mode = event.data;

            return postRobot.send(childWindow, 'setupListener', {

                messageName: 'foo',
                data: {
                    foo: 'bar'
                }

            }).then(function() {

                return postRobot.send(childWindow, 'foo').then(() => {
                    ie8mode.cancel();
                    return remoteIE8mode.cancel();
                });
            });

        });
    });

    it('should succeed in opening and messaging the bridge', function() {

        return postRobot.send(bridge, 'setupListener', {

            messageName: 'foo',
            data: {
                foo: 'bar'
            }

        }).then(function() {

            return postRobot.send(bridge, 'foo').then(function({ data }) {
                assert.equal(data.foo, 'bar');
            });
        });

    });
});
