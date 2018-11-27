import 'cross-domain-utils/src';

import { requestPromises } from './public';

export function cleanUpWindow(win) {
    for (var _i2 = 0, _requestPromises$get2 = requestPromises.get(win, []), _length2 = _requestPromises$get2 == null ? 0 : _requestPromises$get2.length; _i2 < _length2; _i2++) {
        var promise = _requestPromises$get2[_i2];
        promise.reject(new Error('Window cleaned up before response'));
    }
}