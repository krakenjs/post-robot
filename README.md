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

postRobot.on('getCart', function(err, data, callback) {
    return callback({
        amount: 1
    });
});

// In another window

postRobot.send(window, 'getCart', function(err, data) {
    console.log(data);
});
```

## One-off listener

```javascript

// In one window

postRobot.once('init', function(err, data, callback) {
    console.log('init!!');
    return callback();
});

// In another window

postRobot.send(window, 'init', function(err, data) {
    console.log('init done');
});
```