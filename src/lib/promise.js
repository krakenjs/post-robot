
import { SyncPromise } from 'sync-browser-mocks/src/promise';

export let Promise = SyncPromise;

export let promise = {

    Promise,

    run(method) {
        return Promise.resolve().then(method);
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

    deNodeify(method, ...args) {
        return new Promise((resolve, reject) => {
            try {
                if (args.length < method.length) {
                    return method(...args, (err, result) => {
                        return err ? reject(err) : resolve(result);
                    });
                }

                return promise.run(() => {
                    return method(...args);
                }).then(resolve, reject);

            } catch (err) {
                return reject(err);
            }
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