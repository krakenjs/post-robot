
window.console.karma = function() {
    var karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    karma.log('debug', arguments);
    console.log.apply(console, arguments);
};

let addEventListener = window.addEventListener;

window.addEventListener = function(name, method) {
    return addEventListener.call(window, name, function(event) {
        let { origin, source, data } = event;

        try {
            if (source.mockDomain) {
                origin = source.mockDomain;
            }
        } catch (err) {
            // pass
        }

        return method({ origin, source, data });
    });
}
