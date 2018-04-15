/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { type CrossDomainWindowType } from 'cross-domain-utils/src';
import { assert } from 'chai';

import postRobot from '../src';
import { onChildWindowReady } from '../src/lib';

import { enableIE8Mode } from './common';

postRobot.CONFIG.LOG_TO_PAGE = true;
window.mockDomain = 'mock://test-post-robot.com';

function createIframe(name, callback) : CrossDomainWindowType {
    let frame = document.createElement('iframe');
    frame.src = `/base/test/${  name }`;
    frame.id = 'childframe';
    frame.name = `${ Math.random().toString()  }_${  name.replace(/[^a-zA-Z0-9]+/g, '_') }`;
    frame.onload = callback;
    if (!document.body) {
        throw new Error(`Expected document.body to be available`);
    }
    document.body.appendChild(frame);
    return frame.contentWindow;
}

function createPopup(name) : CrossDomainWindowType {
    let popup = window.open(`mock://test-post-robot-child.com|/base/test/${  name }`, `${ Math.random().toString()  }_${  name.replace(/[^a-zA-Z0-9]+/g, '_') }`);
    window.focus();
    return popup;
}

let bridge;

let childWindow,
    childFrame,
    otherChildFrame,
    frameElement;

beforeEach(() => {
    postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = true;
});

afterEach(() => {
    postRobot.CONFIG.ALLOW_SAME_WINDOW = false;
    postRobot.CONFIG.ACK_TIMEOUT = 1000;
});

before(() : ZalgoPromise<mixed> => {
    if (!postRobot.bridge) {
        throw new Error(`Expected postRobot.bridge to be available`);
    }

    return postRobot.bridge.openBridge('/base/test/bridge.htm', 'mock://test-post-robot-child.com').then(frame => {
        bridge = frame;
    }).then(() => {

        childWindow = createPopup('child.htm');
        childFrame = createIframe('child.htm');
        otherChildFrame = createIframe('child.htm');
        frameElement = document.getElementById('childframe');

        return ZalgoPromise.all([
            onChildWindowReady(childWindow),
            onChildWindowReady(childFrame),
            onChildWindowReady(otherChildFrame)
        ]);
    });
});

after(() => {
    if (!document.body) {
        throw new Error(`Expected document.body to be available`);
    }
    let body = document.body;
    // $FlowFixMe
    if (!childFrame.frameElement) {
        throw new Error(`Expected childFrame.frameElement to be available`);
    }
    body.removeChild(childFrame.frameElement);
    // $FlowFixMe
    if (!otherChildFrame.frameElement) {
        throw new Error(`Expected otherChildFrame.frameElement to be available`);
    }
    body.removeChild(otherChildFrame.frameElement);
    childWindow.close();
});


describe('[post-robot] happy cases', () => {

    it('should set up a simple server and listen for a request', (done) => {

        postRobot.on('foobu', () => {
            done();
        });

        postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'foobu'
        }).catch(done);
    });

    it('should set up a simple server and listen for multiple requests', () : ZalgoPromise<mixed> => {

        let count = 0;

        postRobot.on('multilistener', () => {
            count += 1;
        });

        return postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'multilistener'
        }).then(() => {
            return postRobot.send(childFrame, 'sendMessageToParent', {
                messageName: 'multilistener'
            });
        }).then(() => {
            assert.equal(count, 2);
        });
    });

    it('should message a child and expect a response', () : ZalgoPromise<mixed> => {

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                foo: 'bar'
            }

        }).then(() => {

            return postRobot.send(childFrame, 'foo').then(({ data }) => {
                assert.equal(data.foo, 'bar');
            });
        });
    });

    it('should pass a function across windows and be able to call it later', (done) => {

        // eslint-disable-next-line promise/catch-or-return
        postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                done
            }

        }).then(() => {

            return postRobot.send(childFrame, 'foo').then(({ data }) => {
                data.done();
            });
        });
    });

    it('should set up a simple server and listen for a request from a specific domain', (done) => {

        postRobot.on('domainspecificmessage', { domain: 'mock://test-post-robot-child.com' }, () => {
            done();
        });

        postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'domainspecificmessage'
        }).catch(done);
    });


    it('should message a child with a specific domain and expect a response', () : ZalgoPromise<mixed> => {

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'domainspecificmessage',
            data:        {
                foo: 'bar'
            }

        }, { domain: 'mock://test-post-robot-child.com' }).then(() => {

            return postRobot.send(childFrame, 'domainspecificmessage').then(({ data }) => {
                assert.equal(data.foo, 'bar');
            });
        });
    });

    it('should set up a simple server and listen for a request from multiple domains', (done) => {

        postRobot.on('multidomainspecificmessage', { domain: [ 'mock://test-post-robot-child.com', 'mock://non-existant-domain.com' ] }, () => {
            done();
        });

        postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'multidomainspecificmessage'
        }).catch(done);
    });


    it('should message a child with multiple domains and expect a response', () : ZalgoPromise<mixed> => {

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'multidomainspecificmessage',
            data:        {
                foo: 'bar'
            }

        }, { domain: [ 'mock://test-post-robot-child.com', 'mock://non-existant-domain.com' ] }).then(() => {

            return postRobot.send(childFrame, 'multidomainspecificmessage').then(({ data }) => {
                assert.equal(data.foo, 'bar');
            });
        });
    });
});


describe('[post-robot] options', () => {

    it('should work when referencing the child by id', () : ZalgoPromise<mixed> => {

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                foo: 'bar'
            }

        }).then(() => {

            return postRobot.send('childframe', 'foo').then(({ data }) => {
                assert.equal(data.foo, 'bar');
            });
        });
    });

    it('should work when referencing the child by element reference', () : ZalgoPromise<mixed> => {

        if (!(frameElement instanceof HTMLIFrameElement)) {
            throw new TypeError(`Expected frame to be HTMLIFrameElement`);
        }

        return postRobot.send(frameElement, 'setupListener', {

            messageName: 'foo',
            data:        {
                foo: 'bar'
            }

        }).then(() => {

            if (!(frameElement instanceof HTMLIFrameElement)) {
                throw new TypeError(`Expected frame to be HTMLIFrameElement`);
            }

            return postRobot.send(frameElement, 'foo').then(({ data }) => {
                assert.equal(data.foo, 'bar');
            });
        });
    });

    it('should be able to listen for a message only once', () : ZalgoPromise<mixed> => {

        let count = 0;

        postRobot.once('foobuz', () => {
            count += 1;
        });

        return postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'foobuz'
        }).then(() => {
            return postRobot.send(childFrame, 'sendMessageToParent', {
                messageName: 'foobuz'
            }).then(() => {
                throw new Error('Expected success handler to not be called');
            }, () => {
                assert.equal(count, 1);
            });
        });
    });

    it('should be able to re-register the same once handler after the first is called', () : ZalgoPromise<mixed> => {

        let count = 0;

        postRobot.once('foobuzz', ({ data }) => {
            count += data.add;
        });

        return postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'foobuzz',
            data:        {
                add: 2
            }
        }).then(() => {

            postRobot.once('foobuzz', ({ data }) => {
                count += data.add;
            });

            return postRobot.send(childFrame, 'sendMessageToParent', {
                messageName: 'foobuzz',
                data:        {
                    add: 3
                }
            });

        }).then(() => {
            assert.equal(count, 5);
        });
    });

    it('should allow you to register the same listener twice providing it is to different windows', () => {

        postRobot.on('onceonlywindow', { window: childFrame }, () => {
            // pass
        });

        postRobot.on('onceonlywindow', { window: otherChildFrame }, () => {
            // pass
        });
    });

    it('should allow you to register a listener for a specific window', () : ZalgoPromise<mixed> => {

        let count = 0;

        postRobot.on('specificchildlistener', { window: otherChildFrame }, () => {
            count += 1;
        });

        return postRobot.send(otherChildFrame, 'sendMessageToParent', {
            messageName: 'specificchildlistener'
        }).then(() => {
            return postRobot.send(childFrame, 'sendMessageToParent', {
                messageName: 'specificchildlistener'
            }).then(() => {
                throw new Error('Expected success handler to not be called');
            }, (err) => {
                assert.ok(err);
                assert.equal(count, 1);
            });
        });
    });

    it('should ignore its own requests when ALLOW_SAME_WINDOW is enabled', (done) => {

        postRobot.CONFIG.ALLOW_SAME_WINDOW = true;
        postRobot.CONFIG.ACK_TIMEOUT = 50;

        postRobot.send(window, 'doesntexist').then(() => {
            done(new Error('Expected success handler to not be called'));
        }).catch((err) => {
            // It fails because there's no one listening and so no ACK gets back in specified time,
            // but there's no error when this instance of post-robot sees (receives) this same request.
            // Note that we don't set up a handler for "doesntexist".
            if (err instanceof Error) {
                assert.equal(err.message.indexOf('No ack for postMessage doesntexist in'), 0);
            } else {
                assert.ok(err);
            }
        });

        setTimeout(done, 100);
    });
});


describe('[post-robot] error cases', () => {

    it('should get an error when messaging with an unknown name', () : ZalgoPromise<mixed> => {

        return postRobot.send(childFrame, 'doesntexist').then(() => {
            throw new Error('Expected success handler to not be called');
        }, (err) => {
            assert.ok(err);
        });
    });

    it('should error out if you try to register the same listener name twice', () => {

        postRobot.on('onceonly', () => {
            // pass
        });

        try {
            postRobot.on('onceonly', () => {
                // pass
            });
        } catch (err) {
            assert.ok(err);
            return;
        }

        throw new Error('Expected error handler to be called');
    });

    it('should fail when no post message strategies are allowed', () : ZalgoPromise<mixed> => {

        let allowedStrategies = postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS;

        postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS = {};

        return postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'foobuzzz'
        }).then(() => {
            throw new Error('Expected success handler to not be called');
        }, (err) => {
            assert.ok(err);
            postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS = allowedStrategies;
        });
    });

    it('should fail messaging popup when emulating IE and only allowing post messages', () : ZalgoPromise<mixed> => {

        let allowedStrategies = postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS;

        postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS = {
            [ postRobot.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE ]: true
        };

        postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = false;

        return postRobot.send(childWindow, 'sendMessageToParent', {
            messageName: 'foobuzzzz'
        }).then(() => {
            throw new Error('Expected success handler to not be called');
        }, (err) => {
            assert.ok(err);
            postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = true;
            postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS = allowedStrategies;
        });
    });

    it('should fail to send a message when the expected domain does not match', (done) => {

        postRobot.on('foobuzzzzz', { domain: 'http://www.zombo.com' }, () => {
            done(new Error(`Expected handler to not be called`));
        });

        // eslint-disable-next-line promise/catch-or-return
        postRobot.send(childFrame, 'sendMessageToParent', {
            messageName: 'foobuzzzzz'
        }).then(() => {
            return done(new Error('Expected success handler to not be called'));
        }, (err) => {
            assert.ok(err);
            done();
        });
    });

    it('should fail to send a message when the target domain does not match', () : ZalgoPromise<mixed> => {

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                foo: 'bar'
            }

        }).then(() => {

            return postRobot.send(childFrame, 'foo', {}, { domain: 'http://www.zombo.com' }).then(() => {
                throw new Error('Expected success handler to not be called');
            }, (err) => {
                assert.ok(err instanceof Error);
            });
        });
    });

    it('should call the error handler if the target window closes', (done) => {

        let targetWindow = createPopup('child.htm');

        let errorHandler = () => {
            done();
        };

        postRobot.on('foobar', { window: targetWindow, errorHandler, errorOnClose: true }, () => {
            throw new Error('Expected handler to not be called');
        });

        setTimeout(() => {
            targetWindow.close();
        }, 100);
    });
});


describe('[post-robot] popup tests', () => {

    it('should work with a child window', () : ZalgoPromise<mixed> => {

        return postRobot.send(childWindow, 'setupListener', {

            messageName: 'foo',
            data:        {
                foo: 'bar'
            }

        }).then(() => {

            return postRobot.send(childWindow, 'foo').then(({ data }) => {
                assert.equal(data.foo, 'bar');
            });
        });
    });

    it('should succeed messaging popup when emulating IE with all strategies enabled', () : ZalgoPromise<mixed> => {

        return postRobot.send(childWindow, 'enableIE8Mode').then((event) => {

            let ie8mode = enableIE8Mode();
            let remoteIE8mode = event.data;

            return postRobot.send(childWindow, 'setupListener', {

                messageName: 'foo',
                data:        {
                    foo: 'bar'
                }

            }).then(() => {

                // eslint-disable-next-line max-nested-callbacks
                return postRobot.send(childWindow, 'foo').then(() => {
                    let remote = remoteIE8mode.cancel();
                    ie8mode.cancel();
                    return remote;
                });
            });
        });
    });

    it('should succeed in opening and messaging the bridge', () : ZalgoPromise<mixed> => {

        return postRobot.send(bridge, 'setupListener', {

            messageName: 'foo',
            data:        {
                foo: 'bar'
            }

        }).then(() => {

            return postRobot.send(bridge, 'foo').then(({ data }) => {
                assert.equal(data.foo, 'bar');
            });
        });

    });
});
