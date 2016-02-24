# postRobot

Simple postMessage based server. Good for if you want to use post-messaging between windows, but you don't like the
fire-and-forget nature of post messages.

With this, you can set up a listener in one window, have it wait for a post message, and then have it reply with data.

## Example

    // In one window

    postRobot.listen({

        name: 'get_cart',

        handler: function(data, callback) {
            setTimeout(function() {
                return callback(null, {
                    amount: 1,
                    shipping: 2
                });
            }, 3000)
        }
    });

    // In another window

    postRobot.request({

        window: window,
        name: 'get_cart',

        response: function(err, data) {
            if (err) {
                throw err;
            }
            console.log('got cart!', data)
        },

        timeout: 1000
    });