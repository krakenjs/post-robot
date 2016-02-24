# postRobot

Simple postMessage based server.

Use this if you want to communicate between two different windows (or popups, or iframes) using `window.postMessage`,
but you don't like the fire-and-forget nature of the native api.

With this, you can set up a listener in one window, have it wait for a post message, and then have it reply with data,
and gracefully handle any errors that crop up. You can also set a timeout, to be sure that the other window is responding to you,
and fail gracefully if it does not.

## Example

```javascript

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

```