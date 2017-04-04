
export let openBridge;
export let linkUrl;
export let isBridge;
export let needsBridge;
export let needsBridgeForBrowser;
export let needsBridgeForWin;
export let needsBridgeForDomain;
export let openTunnelToOpener;
export let destroyBridges;
export let setupBridgeTunnelOpener;

if (__IE_POPUP_SUPPORT__) {

    let bridge = require('./index');

    openBridge = bridge.openBridge;
    linkUrl = bridge.linkUrl;
    isBridge = bridge.isBridge;
    needsBridge = bridge.needsBridge;
    needsBridgeForBrowser = bridge.needsBridgeForBrowser;
    needsBridgeForWin = bridge.needsBridgeForWin;
    needsBridgeForDomain = bridge.needsBridgeForDomain;
    openTunnelToOpener = bridge.openTunnelToOpener;
    destroyBridges = bridge.destroyBridges;
    setupBridgeTunnelOpener = bridge.setupBridgeTunnelOpener;
}
