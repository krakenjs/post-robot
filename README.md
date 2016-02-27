# postRobot

Simple postMessage based server.

Use this if you want to communicate between two different windows (or popups, or iframes) using `window.postMessage`,
but you don't like the fire-and-forget nature of the native api.

With this, you can set up a listener in one window, have it wait for a post message, and then have it reply with data,
and gracefully handle any errors that crop up. You can also set a timeout, to be sure that the other window is responding to you,
and fail gracefully if it does not.

## Features

- Request/response pattern (avoids sending fire-and-forget messages back and forth)
- Don't worry about serialization, just send javascript objects
- Handle error cases gracefully
  - The user closed the window you're trying to message
  - You sent a message the other window wasn't expecting
  - The other window doesn't have any listener set up for your message
  - The other window didn't acknowledge your message
  - You didn't get a response from the other window in enough time
  - Somebody sent you a message you weren't listening for

## Example

```javascript

// In one window

postRobot.listen({

    name: 'getCart',

    handler: function(data, callback) {
        setTimeout(function() {
            return callback(null, {
                amount: 1,
                shipping: 2
            });
        }, 500)
    }
});

// In another window

postRobot.request({

    window: window,
    name: 'getCart',
    bridge: window.opener.frames.PayPalBridge.returnToParent,

    response: function(err, data) {
        if (err) {
            throw err;
        }
        console.log('got cart!', data)
    },

    timeout: 1000
});

```

## Shortcuts

```
postRobot.on('getCart', function(err, data, callback) {
    return callback({
        amount: 1
    });
});

postRobot.send(window, 'getCart', function(err, data) {
    console.log(data);
});
```