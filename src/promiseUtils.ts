const scheduler =
  typeof setImmediate === "function" ? setImmediate : setTimeout;

export async function flushPromises(): Promise<void> {
  return new Promise(function (resolve) {
    scheduler(resolve);
  });
}

export function hashPromises(hashOfPromises: Record<string, any>) {
  const keys = Object.keys(hashOfPromises);
  return Promise.all(
    keys.map(function (key) {
      return hashOfPromises[key];
    })
  ).then(function (list) {
    return list.reduce(function (hashOfResolved, value, i) {
      hashOfResolved[keys[i]] = value;
      return hashOfResolved;
    }, {});
  });
}

export function promiseTry(callback: Function) {
  return new Promise((resolve, reject) => {
    try {
      resolve(callback());
    } catch (e) {
      reject(e);
    }
  });
}

// export function promiseTimeout(promise: Promise<any>, time: number) {
//   return Promise.race([
//     promise,
//     new Promise((_r, rej) => setTimeout(rej, time)),
//   ]);
// }

export function promiseTimeout(promise: Promise<any>, timeout: number) {
  const timeoutPromise = new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(`Timed out after ${timeout} ms.`);
    }, timeout);
  });

  return Promise.race([promise, timeoutPromise]);
}
