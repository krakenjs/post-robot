// @ts-ignore
window.console.karma = (...args) => {
    const karma =
        // @ts-ignore
        window.karma ||
        // @ts-ignore
        (window.top && window.top.karma) ||
        // @ts-ignore
        (window.opener && window.opener.karma);

    if (karma) {
        karma.log('debug', args);
    }

    // eslint-disable-next-line no-console
    console.log(...args);
};

const IE8_USER_AGENT =
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';
export function enableIE8Mode(): { cancel: () => void } {
    // @ts-ignore
    window.navigator.mockUserAgent = IE8_USER_AGENT;
    return {
        cancel() {
            // @ts-ignore
            delete window.navigator.mockUserAgent;
        }
    };
}
