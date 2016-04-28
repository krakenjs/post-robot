
export let promise = {

    asyncPromise(method) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    return method(resolve, reject);
                } catch (err) {
                    return reject(err);
                }
            });
        });
    },

    run(method) {
        return Promise.resolve().then(method);
    },

    method(method) {
        return function promiseWrapper() {
            return Promise.resolve().then(() => {
                return method.apply(this, arguments);
            });
        }
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
    }
}