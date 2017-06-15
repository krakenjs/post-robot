
import { ZalgoPromise } from 'zalgo-promise';

export function promiseMap(items, method) {
    let results = [];
    for (let i = 0; i < items.length; i++) {
        results.push(ZalgoPromise.try(() => {
            return method(items[i]);
        }));
    }
    return ZalgoPromise.all(results);
}
