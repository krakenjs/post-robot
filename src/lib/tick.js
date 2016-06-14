
let queue = [];

window.addEventListener('message', function(event) {
    if (event.data === '__nextTick') {
        queue.shift().call();
    }
});

export function nextTick(method) {
    queue.push(method);
    window.postMessage('__nextTick', '*');
}