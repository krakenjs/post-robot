# post-robot [:]-\\-<

Post-messaging on the client side using a simple server/client pattern.

Use this if you want to communicate between two different windows (or popups, or iframes) using `window.postMessage`,
but you don't like the fire-and-forget nature of `window.postMessage` (which doesn't tell you if your message got through, if there was an error, and isn't fully supported in even the latest versions of IE for window to window communication).

With this module, you can set up a listener in one window, have it wait for a post message, and then have it reply with data,
all while gracefully handling any errors that crop up.

This also allows cross-domain post messages between two different windows (not just popups) in IE9+.

## Features

- Request/response pattern (avoids sending fire-and-forget messages back and forth)
- Support for promises and async/await
- Don't worry about serialization, just send javascript objects
- Send functions across domains and have them called on the original window
- Handles all of the corner cases for IE9+, which is normally not able to send cross-domain post messages between two different windows, only iframes
- Handle error cases gracefully
  - The user closed the window you're trying to message
  - The other window doesn't have any listener set up for your message
  - The other window didn't acknowledge your message
  - You didn't get a response from the other window in enough time

## Simple listener / sender

```javascript
postRobot.on('getCart', function(data, callback) {
    return callback({
        foo: 'bar'
    });
});
```

```javascript
postRobot.send(window, 'getCart', function(err, data) {
    console.log(data);
});
```

## One-off listener

```javascript
postRobot.once('init', function(source, data, callback) {
    ...
});
```

## Listen to a specific window

```javascript
postRobot.on('init', { window: window.parent }, function(source, data, callback) {
    ...
});
```

## Set a timeout for a response

```javascript
postRobot.send(window, 'getCart', { timeout: 5000 }, function(err, data) {
    console.log(data);
});
```

## Send a message to the direct parent

```javascript
postRobot.sendToParent('getCart', function(err, data) {
    console.log(data);
});
```

## Promises

All of the above can be done with promises rather than callbacks

```javascript
postRobot.on('getCart', function(source, data) {
    return getFoo(data).then(function(bar) {
        return {
            bar: bar
        };
    });
});
```

```javascript
postRobot.once('getCart').then(function(data) {
    ...
}).catch(function(err) {
    ...
});
```

```javascript
postRobot.send(window, 'getCart').then(function(data) {
    ...
}).catch(function(err) {
    ...
});
```

## Async / Await

```javascript
postRobot.on('getCart', async function(source, data) {
    return {
        bar: await bar
    };
});
```

```javascript

try {
    let data = await postRobot.once('getCart');
} catch (err) {
    ...
}
```

```javascript
try {
    let data = await postRobot.send(window, 'getCart');
} catch (err) {
    ...
}
```

## Functions

Post robot lets you send across functions in your data payload, fairly seamlessly.

For example:

```javascript
// Window 1:

postRobot.on('getFoo', function(source, data) {
    return {
        bar: function() {
            console.log('foobar!');
        }
    };
});

// Window 2:

postRobot.send(myWindow, 'getFoo').then(function(source, data) {
    data.bar();
});
```

The function `data.bar()` will be called on the original window.
Because this uses post-messaging behind the scenes and is therefore always async, `data.bar()` will **always** return a promise, and must be `.then`'d or `await`ed.


## IE9+

In order to use post-robot in IE9+ between two different windows on different domains (like a parent window and a popup)
you will need to set up an invisible bridge in an iframe on your parent page:

```
+---------------------+
| Parent xx.com       |
|                     |      +--------------+
|  +---------------+  |      | Popup yy.com |
|  | Bridge yy.com |  |      |              |
|  |               |  |      |              |
|  |               |  |      |              |
|  |               |  |      |              |
|  |               |  |      |              |
|  |               |  |      |              |
|  |               |  |      +--------------+
|  +---------------+  |
|                     |
+---------------------+
```

Supporting IE9+ in your app is pretty simple:

a. Create a bridge path, for example `http://yy.com/bridge.html`, and include post-robot:

```html
<script src="http://xx.com/js/post-robot.js"></script>
```

b. In the parent page, `xx.com`, include the following javascript:

```html
<script>
    postRobot.openBridge('http://yy.com/bridge.html');
</script>
```

Now `Parent xx.com` and `Popup yy.com` can communicate freely using post-robot in IE.

This can even be done in reverse -- for example, `Popup yy.com` can include `Bridge xx.com` if that suits your use cases better.
