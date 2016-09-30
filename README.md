# post-robot [:]-\\-<

Post-messaging on the client side, using a simple listener/client pattern.

Send a message to another window, and:

- [Get a response](#simple-listener-and-sender-with-error-handling) from the window you messaged
- [Pass functions](#functions) to another window, across different domains
- [Handle any errors](#simple-listener-and-sender-with-error-handling) that prevented your message from getting through
- Don't worry about serializing your messages; [just send javascript objects](#simple-listener-and-sender-with-error-handling)
- Use [promises](#listener-with-promise-response), [callbacks](#listener-with-callback-response) or [async/await](#async--await) to wait for responses from windows you message
- Set up a [secure message channel](#secure-message-channel) between two windows on a certain domain
- Send messages between a [parent and a popup window](#parent-to-popup-messaging) in IE

## Simple listener and sender with error handling

```javascript
postRobot.on('getUser', function(event) {
    return {
        name: 'Zippy the Pinhead'
    };
});
```

```javascript
postRobot.send(someWindow, 'getUser').then(function(event) {
    console.log(event.source, event.origin, 'Got user:', event.data.name);

}).catch(function(err) {
    console.error(err);
});
```

## Listener with an promise response

```javascript
postRobot.on('getUser', function(event, callback) {

    return getUser(event.data).then(function(user) {
        return {
            name: user.name
        };
    });
});
```

## Listener with an callback response

```javascript
postRobot.on('getUser', function(event, callback) {

    setTimeout(function() {
        callback(null, {
            name: 'Captain Pugwash'
        });
    }, 500);
});
```

## One-off listener

```javascript
postRobot.once('init', function(event) {

    return {
        name: 'Noggin the Nog'
    };
});
```

## Listen for messages from a specific window

```javascript
postRobot.on('init', { window: window.parent }, function(event, callback) {

    return {
        name: 'Guybrush Threepwood'
    };
});
```

## Listen for messages from a specific domain

```javascript
postRobot.on('init', { domain: 'http://zombo.com' }, function(event, callback) {

    return {
        name: 'Manny Calavera'
    };
});
```

## Set a timeout for a response

```javascript
postRobot.send(someWindow, 'getUser', { timeout: 5000 }).then(function(event) {
    console.log(event.source, event.origin, 'Got user:', event.data.name);

}).catch(function(err) {

    console.error(err);
});;
```

## Send a message to a specific domain

```javascript
postRobot.send(someWindow, 'getUser', { domain: 'http://zombo.com' }).then(function(event) {
    console.log(event.source, event.origin, 'Got user:', event.data.name);
});
```

## Send a message to the direct parent

```javascript
postRobot.sendToParent('getUser').then(function(event) {
    console.log(event.data);
});
```

## Async / Await

```javascript
postRobot.on('getUser', async ({ source, origin, data }) => {

    let user = await getUser(event.data);

    return {
        name: user.name
    };
});
```

```javascript
try {
    let { source, origin, data } = await postRobot.send(someWindow, `getUser`);
    console.log(source, origin, 'Got user:', data.name);

} catch (err) {
    console.error(err);
}
```

## Secure Message Channel

For security reasons, it is recommended that you always explicitly specify the window and domain you want to listen
to and send messages to. This creates a secure message channel that only works between two windows on the specified domain:

```javascript
postRobot.on('getUser', { window: childWindow, domain: 'http://zombo.com' }, function(event) {
    return {
        name: 'Frodo'
    };
});
```

```javascript
postRobot.send(someWindow, { domain: 'http://zombo.com' }, 'getUser').then(function(event) {
    console.log(event.source, event.origin, 'Got user:', event.data.name);

}).catch(function(err) {
    console.error(err);
});
```

## Functions

Post robot lets you send across functions in your data payload, fairly seamlessly.

For example:

```javascript
// Window 1:

postRobot.on('getUser', function(event) {
    return {
        name: 'Nogbad the Bad',
        logout: function() {
            currentUser.logout();
        }
    };
});

// Window 2:

postRobot.send(myWindow, 'getUser').then(function(event) {
    var user = event.data;

    user.logout().then(function() {
        console.log('User was logged out');
    });
});
```

The function `user.logout()` will be called on the **original** window. Post Robot transparently messages back to the
original window, calls the function that was passed, then messages back with the result of the function.

Because this uses post-messaging behind the scenes and is therefore always async, `user.logout()` will **always** return a promise, and must be `.then`'d or `await`ed.


## Parent to popup messaging

> Note: this restriction is extended to all browsers, to ensure cross-browser code works in the same way. If you do
> not need to support IE, you can set
>
> `postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = true`

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

Now `Parent xx.com` and `Popup yy.com` can communicate freely using post-robot. in IE.