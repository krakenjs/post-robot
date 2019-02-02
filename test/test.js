/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { type CrossDomainWindowType } from 'cross-domain-utils/src';
import { uniqueID, noop } from 'belter/src';
import { assert } from 'chai';

import { on, send, once, bridge } from '../src';
import { awaitWindowHello } from '../src/lib';

import { enableIE8Mode } from './common';

window.mockDomain = 'mock://test-post-robot.com';

function getBody() : HTMLBodyElement {
    const body = document.body;
    if (!body) {
        throw new Error(`Can not find body`);
    }
    return body;
}

function createIframe(name, callback) : CrossDomainWindowType {
    const frame = document.createElement('iframe');
    frame.src = `/base/test/${  name }`;
    frame.id = 'childframe';
    frame.name = `${ Math.random().toString()  }_${  name.replace(/[^a-zA-Z0-9]+/g, '_') }`;
    // $FlowFixMe
    frame.addEventListener('load', callback);
    getBody().appendChild(frame);
    return frame.contentWindow;
}

function createPopup(name) : CrossDomainWindowType {
    const popup = window.open(`mock://test-post-robot-child.com/base/test/${  name }`, `${ Math.random().toString()  }_${  name.replace(/[^a-zA-Z0-9]+/g, '_') }`);
    window.focus();
    return popup;
}

let childWindow,
    childFrame,
    otherChildFrame;

before(() : ZalgoPromise<mixed> => {
    if (!bridge) {
        throw new Error(`Expected postRobot.bridge to be available`);
    }

    childWindow = createPopup('child.htm');
    childFrame = createIframe('child.htm');
    otherChildFrame = createIframe('child.htm');

    return ZalgoPromise.all([
        awaitWindowHello(childWindow),
        awaitWindowHello(childFrame),
        awaitWindowHello(otherChildFrame)
    ]).then(noop);
});

after(() => {
    if (!document.body) {
        throw new Error(`Expected document.body to be available`);
    }
    const body = document.body;
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

        on('foobu', () => {
            done();
        });

        send(childFrame, 'sendMessageToParent', {
            messageName: 'foobu'
        }).catch(done);
    });

    it('should set up a simple server and listen for multiple requests', () : ZalgoPromise<mixed> => {

        let count = 0;

        on('multilistener', () => {
            count += 1;
        });

        return send(childFrame, 'sendMessageToParent', {
            messageName: 'multilistener'
        }).then(() => {
            return send(childFrame, 'sendMessageToParent', {
                messageName: 'multilistener'
            });
        }).then(() => {
            assert.equal(count, 2);
        });
    });

    it('should message a child and expect a response', () : ZalgoPromise<mixed> => {

        return send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                foo: 'bar'
            }

        }).then(() => {

            return send(childFrame, 'foo').then(({ data }) => {
                assert.equal(data.foo, 'bar');
            });
        });
    });

    it('should set up a simple server and listen for a request from a specific domain', (done) => {

        on('domainspecificmessage', { domain: 'mock://test-post-robot-child.com' }, () => {
            done();
        });

        send(childFrame, 'sendMessageToParent', {
            messageName: 'domainspecificmessage'
        }).catch(done);
    });


    it('should message a child with a specific domain and expect a response', () : ZalgoPromise<mixed> => {

        return send(childFrame, 'setupListener', {

            messageName: 'domainspecificmessage',
            data:        {
                foo: 'bar'
            }

        }, { domain: 'mock://test-post-robot-child.com' }).then(() => {

            return send(childFrame, 'domainspecificmessage').then(({ data }) => {
                assert.equal(data.foo, 'bar');
            });
        });
    });

    it('should set up a simple server and listen for a request from multiple domains', (done) => {

        on('multidomainspecificmessage', { domain: [ 'mock://test-post-robot-child.com', 'mock://non-existant-domain.com' ] }, () => {
            done();
        });

        send(childFrame, 'sendMessageToParent', {
            messageName: 'multidomainspecificmessage'
        }).catch(done);
    });


    it('should message a child with multiple domains and expect a response', () : ZalgoPromise<mixed> => {

        return send(childFrame, 'setupListener', {

            messageName: 'multidomainspecificmessage',
            data:        {
                foo: 'bar'
            }

        }, { domain: [ 'mock://test-post-robot-child.com', 'mock://non-existant-domain.com' ] }).then(() => {

            return send(childFrame, 'multidomainspecificmessage').then(({ data }) => {
                assert.equal(data.foo, 'bar');
            });
        });
    });
});


describe('[post-robot] options', () => {

    it('should be able to listen for a message only once', () : ZalgoPromise<mixed> => {

        let count = 0;

        once('foobuz', () => {
            count += 1;
        });

        return send(childFrame, 'sendMessageToParent', {
            messageName: 'foobuz'
        }).then(() => {
            return send(childFrame, 'sendMessageToParent', {
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

        once('foobuzz', ({ data }) => {
            count += data.add;
        });

        return send(childFrame, 'sendMessageToParent', {
            messageName: 'foobuzz',
            data:        {
                add: 2
            }
        }).then(() => {

            once('foobuzz', ({ data }) => {
                count += data.add;
            });

            return send(childFrame, 'sendMessageToParent', {
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

        on('onceonlywindow', { window: childFrame }, () => {
            // pass
        });

        on('onceonlywindow', { window: otherChildFrame }, () => {
            // pass
        });
    });

    it('should allow you to register a listener for a specific window', () : ZalgoPromise<mixed> => {

        let count = 0;

        on('specificchildlistener', { window: otherChildFrame }, () => {
            count += 1;
        });

        return send(otherChildFrame, 'sendMessageToParent', {
            messageName: 'specificchildlistener'
        }).then(() => {
            return send(childFrame, 'sendMessageToParent', {
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
        const expectedReturn = 'hello world';

        const myfunction = (val) => {
            actualArgument = val;
            return expectedReturn;
        };

        send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                myfunction
            }

        }).then(() => {
            return send(childFrame, 'foo');

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

        const expectedErrorMessage = 'something went wrong';
        const expectedErrorCode = 'ERROR_567';
        let expectedErrorStack;

        const myfunction = () => {
            const err = new Error(expectedErrorMessage);
            // $FlowFixMe
            err.code = expectedErrorCode;
            expectedErrorStack = err.stack;
            throw err;
        };

        send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                myfunction
            }

        }).then(() => {
            return send(childFrame, 'foo');

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
        const expectedReturn = 'hello world';

        const myfunction = (val) => {
            actualArgument = val;
            return expectedReturn;
        };

        send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                myfunction
            }

        }).then(() => {
            return send(childFrame, 'foo');

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

        const expectedValue = 123;
        let resolver;
        
        // eslint-disable-next-line compat/compat, promise/no-native, no-restricted-globals
        const promise = new Promise((resolve) => {
            resolver = resolve;
        });

        send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                promise
            }

        }).then(() => {
            return send(childFrame, 'foo');

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

        const expectedErrorMessage = 'Oh no!';
        const expectedErrorCode = 'ABC123';
        let expectedErrorStack; // eslint-disable-line prefer-const
        let rejector;
        
        // eslint-disable-next-line compat/compat, promise/no-native, no-restricted-globals
        const promise = new Promise((resolve, reject) => {
            rejector = reject;
        });

        send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                promise
            }

        }).then(() => {
            return send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.promise;

        }).catch(err2 => {
            if (!(err2 instanceof Error)) {
                throw new TypeError(`Expected err to be an Error instance`);
            }

            if (err2.message !== expectedErrorMessage) {
                throw new Error(`Expected function throw error with message ${ expectedErrorMessage }, got ${ err2.message }`);
            }

            // $FlowFixMe
            if (err2.code !== expectedErrorCode) {
                // $FlowFixMe
                throw new Error(`Expected function throw error with code ${ expectedErrorCode }, got ${ err2.code }`);
            }

            if (!expectedErrorStack) {
                throw new Error(`Expected error to have stack`);
            }

            if (err2.stack.indexOf(expectedErrorStack) === -1) {
                throw new Error(`Expected function throw error with stack ${ expectedErrorStack }, got ${ err2.stack }`);
            }

            done();
        });

        const err = new Error(expectedErrorMessage);
        // $FlowFixMe
        err.code = expectedErrorCode;
        expectedErrorStack = err.stack;

        if (!rejector) {
            throw new Error(`Expected rejector to be set`);
        }

        rejector(err);
    });

    it('should pass a zalgo promise across windows and be able to call it later', (done) => {

        const expectedValue = 123;
        let resolver;
        
        const promise = new ZalgoPromise((resolve) => {
            resolver = resolve;
        });

        send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                promise
            }

        }).then(() => {
            return send(childFrame, 'foo');

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

        const expectedErrorMessage = 'Oh no!';
        const expectedErrorCode = 'ABC123';
        let expectedErrorStack; // eslint-disable-line prefer-const
        let rejector;
        
        const promise = new ZalgoPromise((resolve, reject) => {
            rejector = reject;
        });

        send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                promise
            }

        }).then(() => {
            return send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.promise;

        }).catch(err2 => {
            if (!(err2 instanceof Error)) {
                throw new TypeError(`Expected err to be an Error instance`);
            }

            if (err2.message !== expectedErrorMessage) {
                throw new Error(`Expected function throw error with message ${ expectedErrorMessage }, got ${ err2.message }`);
            }

            // $FlowFixMe
            if (err2.code !== expectedErrorCode) {
                // $FlowFixMe
                throw new Error(`Expected function throw error with code ${ expectedErrorCode }, got ${ err2.code }`);
            }

            if (!expectedErrorStack) {
                throw new Error(`Expected error to have stack`);
            }

            if (err2.stack.indexOf(expectedErrorStack) === -1) {
                throw new Error(`Expected function throw error with stack ${ expectedErrorStack }, got ${ err2.stack }`);
            }

            done();
        });

        const err = new Error(expectedErrorMessage);
        // $FlowFixMe
        err.code = expectedErrorCode;
        expectedErrorStack = err.stack;

        if (!rejector) {
            throw new Error(`Expected rejector to be set`);
        }

        rejector(err);
    });

    it('should pass an iframe across the window boundary and focus it', () => {

        const iframe = document.createElement('iframe');
        getBody().appendChild(iframe);
        const mywindow = iframe.contentWindow;

        return send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.mywindow.focus();
        });
    });

    it('should pass an iframe across the window boundary and close it', () => {

        const iframe = document.createElement('iframe');
        getBody().appendChild(iframe);
        const mywindow = iframe.contentWindow;

        return send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.mywindow.close();
        });
    });


    it('should pass an iframe across the window boundary and change its location', () => {

        const iframe = document.createElement('iframe');
        getBody().appendChild(iframe);
        const mywindow = iframe.contentWindow;

        return send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.mywindow.setLocation('/base/test/child.htm');

        }).then(() => {
            return awaitWindowHello(mywindow);

        }).then(() => {
            return send(mywindow, 'setupListener', {

                messageName: 'foo',
                data:        {
                    hello: 'world'
                }
            });

        }).then(() => {
            return send(mywindow, 'foo');

        }).then(({ data }) => {
            if (data.hello !== 'world') {
                throw new Error(`Expected hello to equal world, got ${ data.hello }`);
            }
        });
    });

    it('should pass an iframe across the window boundary and get its instance id', () => {

        const iframe = document.createElement('iframe');
        getBody().appendChild(iframe);
        const mywindow = iframe.contentWindow;

        return send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return send(childFrame, 'foo');

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

        const mywindow = window.open('', uniqueID(), 'width=500,height=500');

        return send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.mywindow.focus();
        });
    });

    it('should pass a popup across the window boundary and close it', () => {

        const mywindow = window.open('', uniqueID(), 'width=500,height=500');

        return send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.mywindow.close();

        }).then(() => {
            if (!mywindow.closed) {
                throw new Error(`Expected window to be closed`);
            }
        });
    });


    it('should pass a popup across the window boundary and change its location', () => {

        const mywindow = window.open('', uniqueID(), 'width=500,height=500');

        return send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return send(childFrame, 'foo');

        }).then(({ data }) => {
            return data.mywindow.setLocation('/base/test/child.htm');

        }).then(() => {
            return awaitWindowHello(mywindow);

        }).then(() => {
            return send(mywindow, 'setupListener', {

                messageName: 'foo',
                data:        {
                    hello: 'world'
                }
            });

        }).then(() => {
            return send(mywindow, 'foo');

        }).then(({ data }) => {
            if (data.hello !== 'world') {
                throw new Error(`Expected hello to equal world, got ${ data.hello }`);
            }
        });
    });

    it('should pass a popup across the window boundary and get its instance id', () => {

        const mywindow = window.open('', uniqueID(), 'width=500,height=500');

        return send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                mywindow
            }

        }).then(() => {
            return send(childFrame, 'foo');

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

        return send(childFrame, 'doesntexist').then(() => {
            throw new Error('Expected success handler to not be called');
        }, (err) => {
            assert.ok(err);
        });
    });

    it('should error out if you try to register the same listener name twice', () => {

        on('onceonly', () => {
            // pass
        });

        try {
            on('onceonly', () => {
                // pass
            });
        } catch (err) {
            assert.ok(err);
            return;
        }

        throw new Error('Expected error handler to be called');
    });

    it('should fail to send a message when the expected domain does not match', (done) => {

        on('foobuzzzzz', { domain: 'http://www.zombo.com' }, () => {
            done(new Error(`Expected handler to not be called`));
        });

        send(childFrame, 'sendMessageToParent', {
            messageName: 'foobuzzzzz'
        }).then(() => {
            return done(new Error('Expected success handler to not be called'));
        }, (err) => {
            assert.ok(err);
            done();
        });
    });

    it('should fail to send a message when the target domain does not match', () : ZalgoPromise<mixed> => {

        return send(childFrame, 'setupListener', {

            messageName: 'foo',
            data:        {
                foo: 'bar'
            }

        }).then(() => {

            return send(childFrame, 'foo', {}, { domain: 'http://www.zombo.com' }).then(() => {
                throw new Error('Expected success handler to not be called');
            }, (err) => {
                assert.ok(err instanceof Error);
            });
        });
    });
});


describe('[post-robot] popup tests', () => {

    it('should work with a popup window', () : ZalgoPromise<mixed> => {
        return send(childWindow, 'setupListener', {

            messageName: 'foo',
            data:        {
                foo: 'bar'
            }

        }).then(() => {

            return send(childWindow, 'foo').then(({ data }) => {
                assert.equal(data.foo, 'bar');
            });
        });
    });

    it('should succeed messaging popup when emulating IE', () : ZalgoPromise<mixed> => {
        const ie8mode = enableIE8Mode();

        if (!bridge) {
            throw new Error(`Bridge not found`);
        }

        return bridge.openBridge('/base/test/bridge.htm', 'mock://test-post-robot-child.com').then(() => {
            const ie8Window = createPopup('child.htm');

            return awaitWindowHello(ie8Window).then(() => {
                return send(ie8Window, 'setupListener', {
    
                    messageName: 'foo',
                    data:        {
                        foo: 'bar'
                    }
        
                });
    
            }).then(() => {
                return send(ie8Window, 'foo');
    
            }).then(() => {
                ie8Window.close();
                ie8mode.cancel();
            });
        });
    });
});
