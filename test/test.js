/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { type CrossDomainWindowType } from 'cross-domain-utils/src';
import { uniqueID } from 'belter/src';
import { assert } from 'chai';

import postRobot from '../src';
import { awaitWindowHello } from '../src/lib';
import { SEND_STRATEGY } from '../src/conf';

import { enableIE8Mode } from './common';

postRobot.CONFIG.LOG_TO_PAGE = true;
window.mockDomain = 'mock://test-post-robot.com';

function getBody() : HTMLBodyElement {
    let body = document.body;
    if (!body) {
        throw new Error(`Can not find body`);
    }
    return body;
}

function createIframe(name, callback) : CrossDomainWindowType {
    let frame = document.createElement('iframe');
    frame.src = `/base/test/${  name }`;
    frame.id = 'childframe';
    frame.name = `${ Math.random().toString()  }_${  name.replace(/[^a-zA-Z0-9]+/g, '_') }`;
    frame.onload = callback;
    getBody().appendChild(frame);
    return frame.contentWindow;
}

function createPopup(name) : CrossDomainWindowType {
    let popup = window.open(`mock://test-post-robot-child.com/base/test/${  name }`, `${ Math.random().toString()  }_${  name.replace(/[^a-zA-Z0-9]+/g, '_') }`);
    window.focus();
    return popup;
}

let bridge;

let childWindow,
    childFrame,
    otherChildFrame,
    frameElement;

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
            awaitWindowHello(childWindow),
            awaitWindowHello(childFrame),
            awaitWindowHello(otherChildFrame)
        ]);
    }).then(() => {
        // pass
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
});


describe('[post-robot] serialization cases', () => {

    it('should pass a function across windows and be able to call it later', (done) => {

        const expectedArgument = 567;
        let actualArgument;
        let expectedReturn = 'hello world';

        const myfunction = (val) => {
            actualArgument = val;
            return expectedReturn;
        };

        postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                myfunction
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.myfunction(expectedArgument);

        }).then(result => {
            if (actualArgument !== expectedArgument) {
                throw new Error(`Expected function to accept ${ expectedArgument }, got ${ actualArgument }`);
            }

            if (result !== expectedReturn) {
                throw new Error(`Expected function to return ${ expectedReturn }, got ${ result }`);
            }

            done();
        });
    });

    it('should pass a function across windows and be able to call it later and capture the exception', (done) => {

        let expectedErrorMessage = 'something went wrong';
        let expectedErrorCode = 'ERROR_567';
        let expectedErrorStack;

        const myfunction = () => {
            let err = new Error(expectedErrorMessage);
            // $FlowFixMe
            err.code = expectedErrorCode;
            expectedErrorStack = err.stack;
            throw err;
        };

        postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                myfunction
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.myfunction();

        }).catch(err => {
            if (!(err instanceof Error)) {
                throw new TypeError(`Expected err to be an Error instance`);
            }

            if (err.message !== expectedErrorMessage) {
                throw new Error(`Expected function throw error with message ${ expectedErrorMessage }, got ${ err.message }`);
            }

            // $FlowFixMe
            if (err.code !== expectedErrorCode) {
                // $FlowFixMe
                throw new Error(`Expected function throw error with code ${ expectedErrorCode }, got ${ err.code }`);
            }

            if (!expectedErrorStack) {
                throw new Error(`Expected error to have stack`);
            }

            if (err.stack.indexOf(expectedErrorStack) === -1) {
                throw new Error(`Expected function throw error with stack ${ expectedErrorStack }, got ${ err.stack }`);
            }

            done();
        });
    });

    it('should pass a function across windows and be able to call it instantly from its origin window', (done) => {

        const expectedArgument = 567;
        let actualArgument;
        let expectedReturn = 'hello world';

        const myfunction = (val) => {
            actualArgument = val;
            return expectedReturn;
        };

        postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                myfunction
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            const promise = data.myfunction(expectedArgument);

            if (actualArgument !== expectedArgument) {
                throw new Error(`Expected function to accept ${ expectedArgument }, got ${ actualArgument }`);
            }

            return promise;

        }).then(result => {

            if (result !== expectedReturn) {
                throw new Error(`Expected function to return ${ expectedReturn }, got ${ result }`);
            }

            done();
        });
    });

    it('should pass a promise across windows and be able to call it later', (done) => {

        let expectedValue = 123;
        let resolver;
        
        // eslint-disable-next-line compat/compat, promise/no-native, no-restricted-globals
        const promise = new Promise((resolve) => {
            resolver = resolve;
        });

        postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                promise
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.promise;

        }).then(result => {
            if (result !== expectedValue) {
                throw new Error(`Expected promise to resolve to ${ expectedValue }, got ${ result }`);
            }

            done();
        });

        if (!resolver) {
            throw new Error(`Expected resolver to be set`);
        }

        resolver(expectedValue);
    });

    it('should pass a promise across windows and be able to reject it later', (done) => {

        let expectedErrorMessage = 'Oh no!';
        let expectedErrorCode = 'ABC123';
        let expectedErrorStack;
        let rejector;
        
        // eslint-disable-next-line compat/compat, promise/no-native, no-restricted-globals
        const promise = new Promise((resolve, reject) => {
            rejector = reject;
        });

        postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                promise
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.promise;

        }).catch(err => {
            if (!(err instanceof Error)) {
                throw new TypeError(`Expected err to be an Error instance`);
            }

            if (err.message !== expectedErrorMessage) {
                throw new Error(`Expected function throw error with message ${ expectedErrorMessage }, got ${ err.message }`);
            }

            // $FlowFixMe
            if (err.code !== expectedErrorCode) {
                // $FlowFixMe
                throw new Error(`Expected function throw error with code ${ expectedErrorCode }, got ${ err.code }`);
            }

            if (!expectedErrorStack) {
                throw new Error(`Expected error to have stack`);
            }

            if (err.stack.indexOf(expectedErrorStack) === -1) {
                throw new Error(`Expected function throw error with stack ${ expectedErrorStack }, got ${ err.stack }`);
            }

            done();
        });

        let err = new Error(expectedErrorMessage);
        // $FlowFixMe
        err.code = expectedErrorCode;
        expectedErrorStack = err.stack;

        if (!rejector) {
            throw new Error(`Expected rejector to be set`);
        }

        rejector(err);
    });

    it('should pass a zalgo promise across windows and be able to call it later', (done) => {

        let expectedValue = 123;
        let resolver;
        
        const promise = new ZalgoPromise((resolve) => {
            resolver = resolve;
        });

        postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                promise
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.promise;

        }).then(result => {
            if (result !== expectedValue) {
                throw new Error(`Expected promise to resolve to ${ expectedValue }, got ${ result }`);
            }

            done();
        });

        if (!resolver) {
            throw new Error(`Expected resolver to be set`);
        }

        resolver(expectedValue);
    });

    it('should pass a zalgo promise across windows and be able to reject it later', (done) => {

        let expectedErrorMessage = 'Oh no!';
        let expectedErrorCode = 'ABC123';
        let expectedErrorStack;
        let rejector;
        
        const promise = new ZalgoPromise((resolve, reject) => {
            rejector = reject;
        });

        postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                promise
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.promise;

        }).catch(err => {
            if (!(err instanceof Error)) {
                throw new TypeError(`Expected err to be an Error instance`);
            }

            if (err.message !== expectedErrorMessage) {
                throw new Error(`Expected function throw error with message ${ expectedErrorMessage }, got ${ err.message }`);
            }

            // $FlowFixMe
            if (err.code !== expectedErrorCode) {
                // $FlowFixMe
                throw new Error(`Expected function throw error with code ${ expectedErrorCode }, got ${ err.code }`);
            }

            if (!expectedErrorStack) {
                throw new Error(`Expected error to have stack`);
            }

            if (err.stack.indexOf(expectedErrorStack) === -1) {
                throw new Error(`Expected function throw error with stack ${ expectedErrorStack }, got ${ err.stack }`);
            }

            done();
        });

        let err = new Error(expectedErrorMessage);
        // $FlowFixMe
        err.code = expectedErrorCode;
        expectedErrorStack = err.stack;

        if (!rejector) {
            throw new Error(`Expected rejector to be set`);
        }

        rejector(err);
    });

    it('should pass an iframe across the window boundary and focus it', () => {

        let iframe = document.createElement('iframe');
        getBody().appendChild(iframe);
        let mywindow = iframe.contentWindow;

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.mywindow.focus();
        });
    });

    it('should pass an iframe across the window boundary and close it', () => {

        let iframe = document.createElement('iframe');
        getBody().appendChild(iframe);
        let mywindow = iframe.contentWindow;

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.mywindow.close();
        });
    });


    it('should pass an iframe across the window boundary and change its location', () => {

        let iframe = document.createElement('iframe');
        getBody().appendChild(iframe);
        let mywindow = iframe.contentWindow;

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.mywindow.setLocation('/base/test/child.htm');

        }).then(() => {
            return awaitWindowHello(mywindow);

        }).then(() => {
            return postRobot.send(mywindow, 'setupListener', {

                messageName: 'foo',
                data:        {
                    hello: 'world'
                }
            });

        }).then(() => {
            return postRobot.send(mywindow, 'foo');

        }).then(({ data }) => {
            if (data.hello !== 'world') {
                throw new Error(`Expected hello to equal world, got ${ data.hello }`);
            }
        });
    });

    it('should pass an iframe across the window boundary and get its instance id', () => {

        let iframe = document.createElement('iframe');
        getBody().appendChild(iframe);
        let mywindow = iframe.contentWindow;

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.mywindow.setLocation('/base/test/child.htm');

        }).then((win) => {
            return win.getInstanceID();

        }).then(instanceID => {

            if (!instanceID || typeof instanceID !== 'string') {
                throw new Error(`Expected instance id to be returned`);
            }
        });
    });

    it('should pass a popup across the window boundary and focus it', () => {

        let mywindow = window.open('', uniqueID(), 'width=500,height=500');

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.mywindow.focus();
        });
    });

    it('should pass a popup across the window boundary and close it', () => {

        let mywindow = window.open('', uniqueID(), 'width=500,height=500');

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.mywindow.close();

        }).then(() => {
            if (!mywindow.closed) {
                throw new Error(`Expected window to be closed`);
            }
        });
    });


    it('should pass a popup across the window boundary and change its location', () => {

        let mywindow = window.open('', uniqueID(), 'width=500,height=500');

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.mywindow.setLocation('/base/test/child.htm');

        }).then(() => {
            return awaitWindowHello(mywindow);

        }).then(() => {
            return postRobot.send(mywindow, 'setupListener', {

                messageName: 'foo',
                data:        {
                    hello: 'world'
                }
            });

        }).then(() => {
            return postRobot.send(mywindow, 'foo');

        }).then(({ data }) => {
            if (data.hello !== 'world') {
                throw new Error(`Expected hello to equal world, got ${ data.hello }`);
            }
        });
    });

    it('should pass a popup across the window boundary and get its instance id', () => {

        let mywindow = window.open('', uniqueID(), 'width=500,height=500');

        return postRobot.send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return postRobot.send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.mywindow.setLocation('/base/test/child.htm');

        }).then((win) => {
            return win.getInstanceID();

        }).then(instanceID => {

            if (!instanceID || typeof instanceID !== 'string') {
                throw new Error(`Expected instance id to be returned`);
            }
        });
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
            [ SEND_STRATEGY.POST_MESSAGE ]: true
        };

        let ie8mode = enableIE8Mode();

        return postRobot.send(childWindow, 'sendMessageToParent', {
            messageName: 'foobuzzzz'
        }).then(() => {
            throw new Error('Expected success handler to not be called');
        }, (err) => {
            assert.ok(err);
            postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS = allowedStrategies;
            ie8mode.cancel();
        });
    });

    it('should fail to send a message when the expected domain does not match', (done) => {

        postRobot.on('foobuzzzzz', { domain: 'http://www.zombo.com' }, () => {
            done(new Error(`Expected handler to not be called`));
        });

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
