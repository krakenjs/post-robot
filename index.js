
window.postRobot = (function() {

    var POST_MESSAGE_REQUEST = 'post_message_request';
    var POST_MESSAGE_RESPONSE = 'post_message_response';

    var POST_MESSAGE_RESPONSE_ACK_SUCCESS = 'success';
    var POST_MESSAGE_RESPONSE_ACK_ERROR = 'error';

    var requestListeners = {};
    var responseHandlers = {};

    function once(method) {
        var called = false;
        return function onceWrapper() {
            if (!called) {
                called = true;
                return method.apply(this, arguments);
            }
        }
    }

    function sendMessage(context, message) {
        context.postMessage(JSON.stringify(message), '*');
    }

    function postMessageRequest(options) {

        if (!options.window) {
            throw new Error('Expected options.window');
        }

        if (!options.name) {
            throw new Error('Expected options.name');
        }

        if (!options.response) {
            throw new Error('Expected options.response');
        }

        options.response = once(options.response);

        var hash = Math.random().toString();
        responseHandlers[hash] = options;

        if (options.timeout) {
            setTimeout(function() {
                if (responseHandlers[hash]) {
                    var handler = responseHandlers[hash];
                    delete responseHandlers[hash];
                    return handler.response(new Error('Post message response timed out after ' + options.timeout + ' ms'));
                }
            }, options.timeout);
        }

        return sendMessage(options.window, {
            type: POST_MESSAGE_REQUEST,
            hash: hash,
            name: options.name,
            data: options.data || {}
        });
    }

    function postMessageListen(options) {

        if (!options.name) {
            throw new Error('Expected options.name');
        }

        if (requestListeners[options.name]) {
            throw new Error('Post message response handler already registered: ' + options.name);
        }

        if (!options.handler) {
            throw new Error('Expected options.handler');
        }

        requestListeners[options.name] = options;
    }

    function postMessageListener(event) {

        var message;

        try {
            message = JSON.parse(event.data);
        } catch (err) {
            return;
        }

        if (!message || !message.type) {
            return;
        }

        if (message.type === POST_MESSAGE_REQUEST) {

            var successResponse = once(function successResponse(response) {
                return sendMessage(event.source, {
                    type: POST_MESSAGE_RESPONSE,
                    ack: POST_MESSAGE_RESPONSE_ACK_SUCCESS,
                    hash: message.hash,
                    name: message.name,
                    response: response || {}
                });
            });

            var errorResponse = once(function errorResponse(err) {
                return sendMessage(event.source, {
                    type: POST_MESSAGE_RESPONSE,
                    ack: POST_MESSAGE_RESPONSE_ACK_ERROR,
                    hash: message.hash,
                    name: message.name,
                    error: err.stack || err.toString()
                });
            });

            if (!requestListeners[message.name]) {
                return errorResponse(new Error('No postmessage request handler for ' + message.name));
            }

            var result;

            try {

                result = requestListeners[message.name].handler(message.data, function(err, response) {
                    return err ? errorResponse(err) : successResponse(response);
                });

            } catch (err) {
                return errorResponse(err);
            }

            if (result) {
                return successResponse(result);
            }

        } else if (message.type === POST_MESSAGE_RESPONSE) {

            if (!responseHandlers[message.hash]) {
                return;
            }

            var handler = responseHandlers[message.hash];
            delete responseHandlers[message.hash];

            if (message.ack === POST_MESSAGE_RESPONSE_ACK_ERROR) {
                return handler.response(message.error);
            } else if (message.ack === POST_MESSAGE_RESPONSE_ACK_SUCCESS) {
                return handler.response(null, message.response);
            }
        }
    };

    window.addEventListener('message', postMessageListener);

    function postMessageDestroy() {
        window.removeEventListener('message', postMessageListener);
    }

    return {
        request: postMessageRequest,
        listen: postMessageListen,
        destroy: postMessageDestroy
    };
})();



