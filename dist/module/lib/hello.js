import { getAllWindows } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { noop, uniqueID, once, weakMapMemoizePromise } from 'belter/src';

import { MESSAGE_NAME, WILDCARD } from '../conf';
import { global, windowStore } from '../global';

global.instanceID = global.instanceID || uniqueID();
var helloPromises = windowStore('helloPromises');

function getHelloPromise(win) {
    return helloPromises.getOrSet(win, function () {
        return new ZalgoPromise();
    });
}

var listenForHello = once(function () {
    global.on(MESSAGE_NAME.HELLO, { domain: WILDCARD }, function (_ref) {
        var source = _ref.source,
            origin = _ref.origin;

        getHelloPromise(source).resolve({ win: source, domain: origin });
        return { instanceID: global.instanceID };
    });
});

export function sayHello(win) {
    return global.send(win, MESSAGE_NAME.HELLO, { instanceID: global.instanceID }, { domain: WILDCARD, timeout: -1 }).then(function (_ref2) {
        var origin = _ref2.origin,
            instanceID = _ref2.data.instanceID;

        getHelloPromise(win).resolve({ win: win, domain: origin });
        return { win: win, domain: origin, instanceID: instanceID };
    });
}

export var getWindowInstanceID = weakMapMemoizePromise(function (win) {
    return sayHello(win).then(function (_ref3) {
        var instanceID = _ref3.instanceID;
        return instanceID;
    });
});

export function initHello() {
    listenForHello();

    for (var _i2 = 0, _getAllWindows2 = getAllWindows(), _length2 = _getAllWindows2 == null ? 0 : _getAllWindows2.length; _i2 < _length2; _i2++) {
        var win = _getAllWindows2[_i2];
        if (win !== window) {
            sayHello(win)['catch'](noop);
        }
    }
}

export function awaitWindowHello(win) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Window';

    var promise = getHelloPromise(win);

    if (timeout !== -1) {
        promise = promise.timeout(timeout, new Error(name + ' did not load after ' + timeout + 'ms'));
    }

    return promise;
}