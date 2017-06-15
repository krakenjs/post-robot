
import { SyncPromise } from 'sync-browser-mocks/src/promise';

export function promiseMap(items, method) {
    let results = [];
    for (let i = 0; i < items.length; i++) {
        results.push(SyncPromise.try(() => {
            return method(items[i]);
        }));
    }
    return SyncPromise.all(results);
}
