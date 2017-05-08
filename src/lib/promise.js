
import { SyncPromise } from 'sync-browser-mocks/src/promise';
import { nextTick } from './tick';

export let Promise = SyncPromise;

export let promise = {

    Promise,

    run(method) {
        return Promise.resolve().then(method);
    },

    nextTick(method) {
        return new Promise((resolve, reject) => {
            nextTick(() => {
                return promise.run(method).then(resolve, reject);
            });
        });
    },

    method(method) {
        return function promiseWrapper() {
            return Promise.resolve().then(() => {
                return method.apply(this, arguments);
            });
        };
    },

    nodeify(prom, callback) {
        if (!callback) {
            return prom;
        }
        prom.then(result => {
            callback(null, result);
        }, err => {
            callback(err);
        });
    },

    map(items, method) {

        let results = [];
        for (let i = 0; i < items.length; i++) {
            results.push(promise.run(() => {
                return method(items[i]);
            }));
        }
        return Promise.all(results);
    }
};
