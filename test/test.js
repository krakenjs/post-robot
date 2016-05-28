
function createIframe(name) {
    var frame = document.createElement('iframe');
    frame.src = '/base/test/' + name;
    document.body.appendChild(frame);
    return frame.contentWindow;
}

var child = createIframe('child.htm');

describe('post-robot', function() {

    it('should set up a simple server and listen for a request', function(done) {

        postRobot.on('foo', function() {
            done();
        });

        postRobot.send(child, 'sendMessageToParent', {
            messageName: 'foo'
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
                foo: 'bar'
            }

        }).then(function() {

            return postRobot.send(child, 'foo', function(err, data) {
                assert.equal(data.foo, 'bar');
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

});
