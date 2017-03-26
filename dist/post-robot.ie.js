!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("postRobot",[],n):"object"==typeof exports?exports.postRobot=n():e.postRobot=n()}(this,function(){return function(e){function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var r={};return n.m=e,n.c=r,n.i=function(e){return e},n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:t})},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=34)}([function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=r(24);Object.keys(t).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return t[e]}})});var o=r(12);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return o[e]}})})},function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=r(17);Object.keys(t).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return t[e]}})});var o=r(4);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return o[e]}})});var i=r(10);Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return i[e]}})});var a=r(7);Object.keys(a).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return a[e]}})});var s=r(28);Object.keys(s).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return s[e]}})});var u=r(18);Object.keys(u).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return u[e]}})});var c=r(29);Object.keys(c).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return c[e]}})});var d=r(15);Object.keys(d).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return d[e]}})});var l=r(16);Object.keys(l).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return l[e]}})})},function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.global=void 0;var t=r(0),o=r(15),i=n.global=window[t.CONSTANTS.WINDOW_PROPS.POSTROBOT]=window[t.CONSTANTS.WINDOW_PROPS.POSTROBOT]||{};i.clean=i.clean||(0,o.cleanup)(i),i.registerSelf=function(){}},function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=r(25);Object.keys(t).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return t[e]}})});var o=r(14);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return o[e]}})});var i=r(13);Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return i[e]}})})},function(e,n,r){"use strict";function t(e){return"[object RegExp]"===Object.prototype.toString.call(e)}Object.defineProperty(n,"__esModule",{value:!0}),n.util=void 0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};n.isRegex=t;var i=r(0),a=n.util={once:function(e){if(!e)return e;var n=!1;return function(){if(!n)return n=!0,e.apply(this,arguments)}},noop:function(){},safeHasProp:function(e,n){try{return!!e[n]}catch(e){return!1}},safeGetProp:function(e,n){try{return e[n]}catch(e){return}},listen:function(e,n,r){return e.addEventListener?e.addEventListener(n,r):e.attachEvent("on"+n,r),{cancel:function(){e.removeEventListener?e.removeEventListener(n,r):e.detachEvent("on"+n,r)}}},apply:function(e,n,r){return"function"==typeof e.apply?e.apply(n,r):e(r[0],r[1],r[2],r[3],r[4],r[5],r[6],r[7],r[8],r[9])},find:function(e,n,r){if(!e)return r;for(var t=0;t<e.length;t++)if(n(e[t]))return e[t];return r},map:function(e,n){for(var r=[],t=0;t<e.length;t++)r.push(n(e[t]));return r},some:function(e,n){n=n||Boolean;for(var r=0;r<e.length;r++)if(n(e[r]))return!0;return!1},keys:function(e){var n=[];for(var r in e)e.hasOwnProperty(r)&&n.push(r);return n},values:function(e){var n=[];for(var r in e)e.hasOwnProperty(r)&&n.push(e[r]);return n},getByValue:function(e,n){for(var r in e)if(e.hasOwnProperty(r)&&e[r]===n)return r},uniqueID:function(){var e="0123456789abcdef";return"xxxxxxxxxx".replace(/./g,function(){return e.charAt(Math.floor(Math.random()*e.length))})},memoize:function(e){var n={};return function(){var r=JSON.stringify(Array.prototype.slice.call(arguments));return n.hasOwnProperty(r)||(n[r]=e.apply(this,arguments)),n[r]}},extend:function(e,n){if(!n)return e;for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r]);return e},each:function(e,n){if(Array.isArray(e))for(var r=0;r<e.length;r++)n(e[r],r);else if("object"===(void 0===e?"undefined":o(e))&&null!==e)for(var t in e)e.hasOwnProperty(t)&&n(e[t],t)},replaceObject:function(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;if(r>=100)throw new Error("Self-referential object passed, or object contained too many layers");var t=Array.isArray(e)?[]:{};return a.each(e,function(e,i){var s=n(e,i);void 0!==s?t[i]=s:"object"===(void 0===e?"undefined":o(e))&&null!==e?t[i]=a.replaceObject(e,n,r+1):t[i]=e}),t},safeInterval:function(e,n){function r(){t=setTimeout(r,n),e.call()}var t=void 0;return t=setTimeout(r,n),{cancel:function(){clearTimeout(t)}}},intervalTimeout:function(e,n,r){var t=a.safeInterval(function(){e-=n,e=e<=0?0:e,0===e&&t.cancel(),r(e)},n);return t},getActualDomain:function(e){return e.location.protocol+"//"+e.location.host},getDomain:function(e){if(e=e||window,e.mockDomain&&0===e.mockDomain.indexOf(i.CONSTANTS.MOCK_PROTOCOL))return e.mockDomain;if(!e.location.protocol)throw new Error("Can not read window protocol");if(e.location.protocol===i.CONSTANTS.FILE_PROTOCOL)return a.getActualDomain(e);if(!e.location.host)throw new Error("Can not read window host");return a.getActualDomain(e)},getDomainFromUrl:function(e){var n=void 0;return e.match(/^(https?|mock|file):\/\//)?(n=e,n=n.split("/").slice(0,3).join("/")):this.getDomain()},safeGet:function(e,n){var r=void 0;try{r=e[n]}catch(e){}return r}}},function(e,n,r){"use strict";function t(){u.global.initialized||((0,s.listenForMessages)(),r(9).openTunnelToOpener(),(0,a.initOnReady)(),(0,a.listenForMethods)()),u.global.initialized=!0}function o(){return u.global.clean.all().then(function(){return u.global.initialized=!1,t()})}Object.defineProperty(n,"__esModule",{value:!0}),n.Promise=void 0,n.init=t,n.reset=o;var i=r(32);Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return i[e]}})});var a=r(1);Object.defineProperty(n,"Promise",{enumerable:!0,get:function(){return a.Promise}});var s=r(3),u=r(2);t()},function(e,n,r){"use strict";function t(e,n,r){function t(){if(o){if(a)return r(s);if(i)return n(u)}}var o=!1,i=!1,a=!1,s=void 0,u=void 0;try{e(function(e){u=e,i=!0,t()},function(e){s=e,a=!0,t()})}catch(e){return r(e)}o=!0,t()}function o(e){d.push(e),l=l||setTimeout(i,1)}function i(){l=null;var e=d;d=[];for(var n=0;n<e.length;n++){(function(n){var r=e[n];if(r.silentReject)return"continue";r.handlers.push({onError:function(e){r.silentReject||a(e)}}),r.dispatch()})(n)}}function a(e){if(f.indexOf(e)===-1){f.push(e),setTimeout(function(){throw e},1);for(var n=0;n<c.length;n++)c[n](e)}}function s(e){try{if(!e)return!1;if(window.Window&&e instanceof window.Window)return!1;if(window.constructor&&e instanceof window.constructor)return!1;if(m){var n=m.call(e);if("[object Window]"===n||"[object global]"===n||"[object DOMWindow]"===n)return!1}if(e&&e.then instanceof Function)return!0}catch(e){return!1}return!1}function u(){window.Promise=w}Object.defineProperty(n,"__esModule",{value:!0}),n.patchPromise=u;var c=[],d=[],l=void 0,f=[],m={}.toString,w=n.SyncPromise=function(e){if(this.resolved=!1,this.rejected=!1,this.silentReject=!1,this.handlers=[],o(this),e){var n=this;t(e,function(e){return n.resolve(e)},function(e){return n.reject(e)})}};w.resolve=function(e){return s(e)?e:(new w).resolve(e)},w.reject=function(e){return(new w).reject(e)},w.prototype.resolve=function(e){if(this.resolved||this.rejected)return this;if(s(e))throw new Error("Can not resolve promise with another promise");return this.resolved=!0,this.value=e,this.dispatch(),this},w.prototype.reject=function(e){if(this.resolved||this.rejected)return this;if(s(e))throw new Error("Can not reject promise with another promise");return this.rejected=!0,this.value=e,this.dispatch(),this},w.prototype.asyncReject=function(e){this.silentReject=!0,this.reject(e)},w.prototype.dispatch=function(){var e=this;if(this.resolved||this.rejected)for(;this.handlers.length;){(function(){var n=e.handlers.shift(),r=void 0,t=void 0;try{e.resolved?r=n.onSuccess?n.onSuccess(e.value):e.value:e.rejected&&(n.onError?r=n.onError(e.value):t=e.value)}catch(e){t=e}if(r===e)throw new Error("Can not return a promise from the the then handler of the same promise");if(!n.promise)return"continue";t?n.promise.reject(t):s(r)?r.then(function(e){n.promise.resolve(e)},function(e){n.promise.reject(e)}):n.promise.resolve(r)})()}},w.prototype.then=function(e,n){if(e&&"function"!=typeof e&&!e.call)throw new Error("Promise.then expected a function for success handler");if(n&&"function"!=typeof n&&!n.call)throw new Error("Promise.then expected a function for error handler");var r=new w(null,this);return this.handlers.push({promise:r,onSuccess:e,onError:n}),this.silentReject=!0,this.dispatch(),r},w.prototype.catch=function(e){return this.then(null,e)},w.prototype.finally=function(e){return this.then(function(n){return w.try(e).then(function(){return n})},function(n){return w.try(e).then(function(){throw n})})},w.all=function(e){for(var n=new w,r=e.length,t=[],o=0;o<e.length;o++)!function(o){(s(e[o])?e[o]:w.resolve(e[o])).then(function(e){t[o]=e,0==(r-=1)&&n.resolve(t)},function(e){n.reject(e)})}(o);return r||n.resolve(t),n},w.onPossiblyUnhandledException=function(e){c.push(e)},w.try=function(e){return w.resolve().then(e)},w.delay=function(e){return new w(function(n){setTimeout(n,e)})},w.hash=function(e){var n={},r=[];for(var t in e)!function(t){e.hasOwnProperty(t)&&r.push(w.resolve(e[t]).then(function(e){n[t]=e}))}(t);return w.all(r).then(function(){return n})},w.promisifyCall=function(){var e=Array.prototype.slice.call(arguments),n=e.shift();if("function"!=typeof n)throw new Error("Expected promisifyCall to be called with a function");return new w(function(r,t){return e.push(function(e,n){return e?t(e):r(n)}),n.apply(null,e)})}},function(e,n,r){"use strict";function t(e){for(var n=j.global.domainMatches,r=Array.isArray(n),t=0,n=r?n:n[Symbol.iterator]();;){var o;if(r){if(t>=n.length)break;o=n[t++]}else{if(t=n.next(),t.done)break;o=t.value}var i=o;if(i.win===e)return i.match}var a=void 0;try{a=R.util.getDomain(window)===R.util.getDomain(e)}catch(e){a=!1}return j.global.clean.push(j.global.domainMatches,{win:e,match:a}),I||(I=setTimeout(function(){j.global.domainMatches=[],I=null},1)),a}function o(e){try{if(e&&e.location&&e.location.href)return!0}catch(n){return j.global.clean.push(j.global.domainMatches,{win:e,match:!1}),!1}return!0}function i(e){if(e)try{return e.opener}catch(e){return}}function a(e){if(e)try{if(e.parent&&e.parent!==e)return e.parent}catch(e){return}}function s(e){var n=[];try{for(;e.parent!==e;)n.push(e.parent),e=e.parent}catch(e){}return n}function u(e,n){if(!e||!n)return!1;var r=a(n);return r?r===e:s(n).indexOf(e)!==-1}function c(e){var n=[],r=void 0;try{r=e.frames}catch(n){r=e}var t=void 0;try{t=r.length}catch(e){}if(0===t)return n;if(t){for(var o=0;o<t;o++){var i=void 0;try{i=r[o]}catch(e){continue}n.push(i)}return n}for(var a=0;a<100;a++){var s=void 0;try{s=r[a]}catch(e){return n}if(!s)return n;n.push(s)}return n}function d(e){for(var n=[],r=c(e),t=Array.isArray(r),o=0,r=t?r:r[Symbol.iterator]();;){var i;if(t){if(o>=r.length)break;i=r[o++]}else{if(o=r.next(),o.done)break;i=o.value}var a=i;n.push(a);for(var s=d(a),u=Array.isArray(s),l=0,s=u?s:s[Symbol.iterator]();;){var f;if(u){if(l>=s.length)break;f=s[l++]}else{if(l=s.next(),l.done)break;f=l.value}var m=f;n.push(m)}}return n}function l(e){var n=d(e);n.push(e);for(var r=s(e),t=Array.isArray(r),o=0,r=t?r:r[Symbol.iterator]();;){var i;if(t){if(o>=r.length)break;i=r[o++]}else{if(o=r.next(),o.done)break;i=o.value}var a=i;n.push(a);for(var u=c(a),l=Array.isArray(u),f=0,u=l?u:u[Symbol.iterator]();;){var m;if(l){if(f>=u.length)break;m=u[f++]}else{if(f=u.next(),f.done)break;m=f.value}var w=m;n.indexOf(w)===-1&&n.push(w)}}return n}function f(e){if(e){try{if(e.top)return e.top}catch(e){}if(a(e)===e)return e;try{if(u(window,e))return window.top}catch(e){}try{if(u(e,window))return window.top}catch(e){}for(var n=d(e),r=Array.isArray(n),t=0,n=r?n:n[Symbol.iterator]();;){var o;if(r){if(t>=n.length)break;o=n[t++]}else{if(t=n.next(),t.done)break;o=t.value}var i=o;try{if(i.top)return i.top}catch(e){}if(a(i)===i)return i}}}function m(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];try{if(e===window)return!1}catch(e){return!0}try{if(!e)return!0}catch(e){return!0}try{if(e.closed)return!0}catch(e){return!e||"Call was rejected by callee.\r\n"!==e.message}return!!(n&&t(e)&&R.util.safeGet(e,"mockclosed"))}function w(e){return e=e||window,e.navigator.mockUserAgent||e.navigator.userAgent}function p(e,n){for(var r=c(e),o=r,i=Array.isArray(o),a=0,o=i?o:o[Symbol.iterator]();;){var s;if(i){if(a>=o.length)break;s=o[a++]}else{if(a=o.next(),a.done)break;s=a.value}var u=s;try{if(t(u)&&u.name===n&&r.indexOf(u)!==-1)return u}catch(e){}}try{if(r.indexOf(e.frames[n])!==-1)return e.frames[n]}catch(e){}try{if(r.indexOf(e[n])!==-1)return e[n]}catch(e){}}function g(e,n){var r=p(e,n);if(r)return r;for(var t=c(e),o=Array.isArray(t),i=0,t=o?t:t[Symbol.iterator]();;){var a;if(o){if(i>=t.length)break;a=t[i++]}else{if(i=t.next(),i.done)break;a=i.value}var s=a,u=g(s,n);if(u)return u}}function h(e,n){var r=void 0;return r=p(e,n),r?r:g(f(e),n)}function S(e,n){var r=a(n);if(r)return r===e;for(var t=c(e),o=Array.isArray(t),i=0,t=o?t:t[Symbol.iterator]();;){var s;if(o){if(i>=t.length)break;s=t[i++]}else{if(i=t.next(),i.done)break;s=i.value}if(s===n)return!0}return!1}function v(e,n){return e===i(n)}function O(e){e=e||window;var n=i(e);if(n)return n;var r=a(e);return r?r:void 0}function y(e){for(var n=[],r=e;r;)(r=O(r))&&n.push(r);return n}function b(e,n){var r=O(n);if(r)return r===e;if(n===e)return!1;if(f(n)===n)return!1;for(var t=c(e),o=Array.isArray(t),i=0,t=o?t:t[Symbol.iterator]();;){var a;if(o){if(i>=t.length)break;a=t[i++]}else{if(i=t.next(),i.done)break;a=i.value}if(a===n)return!0}return!1}function E(){return Boolean(i(window))}function _(){return Boolean(a(window))}function T(){return Boolean(!_()&&!E())}function A(){return E()?D.CONSTANTS.WINDOW_TYPES.POPUP:_()?D.CONSTANTS.WINDOW_TYPES.IFRAME:D.CONSTANTS.WINDOW_TYPES.FULLPAGE}function P(e,n){for(var r=e,t=Array.isArray(r),o=0,r=t?r:r[Symbol.iterator]();;){var i;if(t){if(o>=r.length)break;i=r[o++]}else{if(o=r.next(),o.done)break;i=o.value}for(var a=i,s=n,u=Array.isArray(s),c=0,s=u?s:s[Symbol.iterator]();;){var d;if(u){if(c>=s.length)break;d=s[c++]}else{if(c=s.next(),c.done)break;d=c.value}if(a===d)return!0}}}function N(e,n){var r=f(e),t=f(n);try{if(r&&t)return r===t}catch(e){}var o=l(e),a=l(n);if(P(o,a))return!0;var s=i(r),u=i(t);return(!s||!P(l(s),a))&&((!u||!P(l(u),o))&&void 0)}function M(){var e=void 0,n=void 0;try{if("{}"!==JSON.stringify({})&&(e=Object.prototype.toJSON,delete Object.prototype.toJSON),"{}"!==JSON.stringify({}))throw new Error("Can not correctly serialize JSON objects");if("[]"!==JSON.stringify([])&&(n=Array.prototype.toJSON,delete Array.prototype.toJSON),"[]"!==JSON.stringify([]))throw new Error("Can not correctly serialize JSON objects")}catch(e){throw new Error("Can not repair JSON.stringify: "+e.message)}var r=JSON.stringify.apply(this,arguments);try{e&&(Object.prototype.toJSON=e),n&&(Array.prototype.toJSON=n)}catch(e){throw new Error("Can not repair JSON.stringify: "+e.message)}return r}function C(){return JSON.parse.apply(this,arguments)}Object.defineProperty(n,"__esModule",{value:!0}),n.isSameDomain=t,n.isActuallySameDomain=o,n.getOpener=i,n.getParent=a,n.getParents=s,n.isAncestorParent=u,n.getFrames=c,n.getAllChildFrames=d,n.getAllFramesInWindow=l,n.getTop=f,n.isWindowClosed=m,n.getUserAgent=w,n.getFrameByName=p,n.findChildFrameByName=g,n.findFrameByName=h,n.isParent=S,n.isOpener=v,n.getAncestor=O,n.getAncestors=y,n.isAncestor=b,n.isPopup=E,n.isIframe=_,n.isFullpage=T,n.getWindowType=A,n.isSameTopWindow=N,n.jsonStringify=M,n.jsonParse=C;var R=r(4),j=r(2),D=r(0);j.global.domainMatches=j.global.domainMatches||[];var I=void 0},function(e,n,r){"use strict";function t(){return!!(0,p.getUserAgent)(window).match(/MSIE|trident|edge/i)||!w.CONFIG.ALLOW_POSTMESSAGE_POPUP}function o(e){return(!e||!(0,p.isSameTopWindow)(window,e))&&(!e||!(0,p.isSameDomain)(e))}function i(e){return!e||p.util.getDomain()!==p.util.getDomainFromUrl(e)}function a(e){var n=e.win,r=e.domain;return t()&&o(n)&&i(r)}function s(e){e=e||p.util.getDomainFromUrl(e);var n=e.replace(/[^a-zA-Z0-9]+/g,"_");return w.CONSTANTS.BRIDGE_NAME_PREFIX+"_"+n}function u(){return window.name&&window.name===s(p.util.getDomain())}function c(e){var n=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:w.CONFIG.BRIDGE_TIMEOUT,new p.promise.Promise);g.global.clean.push(g.global.remoteWindows,{win:e,sendMessagePromise:n})}function d(e){for(var n=0;n<g.global.remoteWindows.length;n++)if(g.global.remoteWindows[n].win===e)return g.global.remoteWindows[n]}function l(e,n,r){var t=d(e);if(!t)throw new Error("Window not found to register sendMessage to");var o=function(t,o,i){if(t!==e)throw new Error("Remote window does not match window");if(!(0,p.matchDomain)(i,n))throw new Error("Remote domain "+i+" does not match domain "+n);r(o)};t.sendMessagePromise.resolve(o),t.sendMessagePromise=p.promise.Promise.resolve(o)}function f(e,n){var r=d(e);if(!r)throw new Error("Window not found on which to reject sendMessage");r.sendMessagePromise.asyncReject(n)}function m(e,n,r){var t=(0,p.isOpener)(window,e),o=(0,p.isOpener)(e,window);if(!t&&!o)throw new Error("Can only send messages to and from parent and popup windows");var i=d(e);if(!i)throw new Error("Window not found to send message to");return i.sendMessagePromise.then(function(t){return t(e,n,r)})}Object.defineProperty(n,"__esModule",{value:!0}),n.documentBodyReady=void 0,n.needsBridgeForBrowser=t,n.needsBridgeForWin=o,n.needsBridgeForDomain=i,n.needsBridge=a,n.getBridgeName=s,n.isBridge=u,n.registerRemoteWindow=c,n.findRemoteWindow=d,n.registerRemoteSendMessage=l,n.rejectRemoteSendMessage=f,n.sendBridgeMessage=m;var w=r(0),p=r(1),g=r(2),h=r(3);n.documentBodyReady=new p.promise.Promise(function(e){if(window.document&&window.document.body)return e(window.document.body);var n=setInterval(function(){if(window.document&&window.document.body)return clearInterval(n),e(window.document.body)},10)});g.global.remoteWindows=g.global.remoteWindows||[],g.global.receiveMessage=function(e){return(0,h.receiveMessage)(e)}},function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=r(19);Object.keys(t).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return t[e]}})});var o=r(20);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return o[e]}})});var i=r(8);Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return i[e]}})});var a=r(22);Object.keys(a).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return a[e]}})})},function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.log=void 0;var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=r(4),i=r(7),a=r(0),s=["debug","info","warn","error"];Function.prototype.bind&&window.console&&"object"===t(console.log)&&["log","info","warn","error"].forEach(function(e){console[e]=this.bind(console[e],console)},Function.prototype.call);var u=n.log={clearLogs:function(){if(window.console&&window.console.clear&&window.console.clear(),a.CONFIG.LOG_TO_PAGE){var e=document.getElementById("postRobotLogs");e&&e.parentNode.removeChild(e)}},writeToPage:function(e,n){setTimeout(function(){var r=document.getElementById("postRobotLogs");r||(r=document.createElement("div"),r.id="postRobotLogs",r.style.cssText="width: 800px; font-family: monospace; white-space: pre-wrap;",document.body.appendChild(r));var t=document.createElement("div"),a=(new Date).toString().split(" ")[4],s=o.util.map(n,function(e){if("string"==typeof e)return e;if(!e)return Object.prototype.toString.call(e);var n=void 0;try{n=(0,i.jsonStringify)(e,0,2)}catch(e){n="[object]"}return"\n\n"+n+"\n\n"}).join(" "),u=a+" "+e+" "+s;t.innerHTML=u;var c={log:"#ddd",warn:"orange",error:"red",info:"blue",debug:"#aaa"}[e];t.style.cssText="margin-top: 10px; color: "+c+";",r.childNodes.length?r.insertBefore(t,r.childNodes[0]):r.appendChild(t)})},logLevel:function(e,n){setTimeout(function(){try{if(s.indexOf(e)<s.indexOf(a.CONFIG.LOG_LEVEL))return;if(n=Array.prototype.slice.call(n),n.unshift(""+window.location.host+window.location.pathname),n.unshift("::"),n.unshift(""+(0,i.getWindowType)().toLowerCase()),n.unshift("[post-robot]"),a.CONFIG.LOG_TO_PAGE&&u.writeToPage(e,n),!window.console)return;if(window.console[e]||(e="log"),!window.console[e])return;window.console[e].apply(window.console,n)}catch(e){}},1)},debug:function(){u.logLevel("debug",arguments)},info:function(){u.logLevel("info",arguments)},warn:function(){u.logLevel("warn",arguments)},error:function(){u.logLevel("error",arguments)}}},function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=r(23);Object.keys(t).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return t[e]}})})},function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=n.CONSTANTS={POST_MESSAGE_TYPE:{REQUEST:"postrobot_message_request",RESPONSE:"postrobot_message_response",ACK:"postrobot_message_ack"},POST_MESSAGE_ACK:{SUCCESS:"success",ERROR:"error"},POST_MESSAGE_NAMES:{METHOD:"postrobot_method",READY:"postrobot_ready",OPEN_TUNNEL:"postrobot_open_tunnel"},WINDOW_TYPES:{FULLPAGE:"fullpage",POPUP:"popup",IFRAME:"iframe"},WINDOW_PROPS:{POSTROBOT:"__postRobot__"},SERIALIZATION_TYPES:{METHOD:"postrobot_method",ERROR:"postrobot_error"},SEND_STRATEGIES:{POST_MESSAGE:"postrobot_post_message",BRIDGE:"postrobot_bridge",GLOBAL:"postrobot_global"},MOCK_PROTOCOL:"mock:",FILE_PROTOCOL:"file:",BRIDGE_NAME_PREFIX:"__postrobot_bridge__",POSTROBOT_PROXY:"__postrobot_proxy__",WILDCARD:"*"};n.POST_MESSAGE_NAMES_LIST=Object.keys(t.POST_MESSAGE_NAMES).map(function(e){return t.POST_MESSAGE_NAMES[e]})},function(e,n,r){"use strict";function t(){s.global.listeners.request=[],s.global.listeners.response=[]}function o(e,n,r){for(var t={},o=s.global.listeners.request,i=Array.isArray(o),a=0,o=i?o:o[Symbol.iterator]();;){var d;if(i){if(a>=o.length)break;d=o[a++]}else{if(a=o.next(),a.done)break;d=a.value}var l=d;if(l.name===e){var f=l.win&&l.win!==c.CONSTANTS.WILDCARD,m=l.domain&&l.domain!==c.CONSTANTS.WILDCARD,w=f&&l.win===n,p=m&&(0,u.matchDomain)(l.domain,r);f&&m?w&&p&&(t.all=t.all||l.options):m?p&&(t.domain=t.domain||l.options):f?w&&(t.win=t.win||l.options):t.name=t.name||l.options}}return t.all||t.domain||t.win||t.name}function i(e){for(var n=s.global.listeners.request,r=Array.isArray(n),t=0,n=r?n:n[Symbol.iterator]();;){var o;if(r){if(t>=n.length)break;o=n[t++]}else{if(t=n.next(),t.done)break;o=t.value}var i=o;i.options===e&&s.global.listeners.request.splice(s.global.listeners.request.indexOf(i),1)}}function a(e,n,r,t,a){var u=o(e,n,r);if(u){if(!a){if(n)throw new Error("Request listener already exists for "+e+" on domain "+r+" for specified window: "+(u.win===n));throw new Error("Request listener already exists for "+e+" on domain "+r)}i(u)}s.global.clean.push(s.global.listeners.request,{name:e,win:n,domain:r,options:t})}Object.defineProperty(n,"__esModule",{value:!0}),n.listeners=void 0,n.resetListeners=t,n.getRequestListener=o,n.removeRequestListener=i,n.addRequestListener=a;var s=r(2),u=r(1),c=r(0);s.global.listeners=s.global.listeners||{request:[],response:[]};n.listeners=s.global.listeners},function(e,n,r){"use strict";function t(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function o(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},t=u.util.uniqueID(),o=(0,u.getWindowType)();return a({},n,r,{sourceDomain:u.util.getDomain(window),id:n.id||t,windowType:o})}function i(e,n,r){return u.promise.run(function(){n=o(e,n,{data:(0,u.serializeMethods)(e,r,n.data),domain:r});var i=void 0;if(i=s.POST_MESSAGE_NAMES_LIST.indexOf(n.name)!==-1||n.type===s.CONSTANTS.POST_MESSAGE_TYPE.ACK?"debug":"error"===n.ack?"error":"info",u.log.logLevel(i,["\n\n\t","#send",n.type.replace(/^postrobot_message_/,""),"::",n.name,"::",r||s.CONSTANTS.WILDCARD,"\n\n",n]),s.CONFIG.MOCK_MODE)return delete n.target,window[s.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({origin:u.util.getDomain(window),source:window,data:(0,u.jsonStringify)(n,0,2)});if(e===window)throw new Error("Attemping to send message to self");if((0,u.isWindowClosed)(e))throw new Error("Window is closed");u.log.debug("Running send message strategies",n);var a=[],d=(0,u.jsonStringify)(t({},s.CONSTANTS.WINDOW_PROPS.POSTROBOT,n),0,2);return u.promise.map(Object.keys(c.SEND_MESSAGE_STRATEGIES),function(n){return u.promise.run(function(){if(!s.CONFIG.ALLOWED_POST_MESSAGE_METHODS[n])throw new Error("Strategy disallowed: "+n);return c.SEND_MESSAGE_STRATEGIES[n](e,d,r)}).then(function(){return a.push(n+": success"),!0},function(e){return a.push(n+": "+(e.stack||e.toString())+"\n"),!1})}).then(function(e){var r=u.util.some(e),t=n.type+" "+n.name+" "+(r?"success":"error")+":\n  - "+a.join("\n  - ")+"\n";if(u.log.debug(t),!r)throw new Error(t)})})}Object.defineProperty(n,"__esModule",{value:!0});var a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e};n.buildMessage=o,n.sendMessage=i;var s=r(0),u=r(1),c=r(27)},function(e,n,r){"use strict";function t(e){var n=[];return{getters:{array:function(){return[]},object:function(){return{}}},set:function(n,r){return e[n]=r,this.register(function(){delete e[n]}),r},push:function(e,n){return e.push(n),this.register(function(){var r=e.indexOf(n);r!==-1&&e.splice(r,1)}),n},setItem:function(e,n,r){return e[n]=r,this.register(function(){delete e[n]}),r},register:function(e,r){r||(r=e,e=void 0),n.push({complete:!1,name:e,run:function(){if(!this.complete)return this.complete=!0,r()}})},hasTasks:function(){return Boolean(n.filter(function(e){return!e.complete}).length)},all:function(){for(var e=[];n.length;)e.push(n.pop().run());return o.SyncPromise.all(e).then(function(){})},run:function(e){for(var r=[],t=[],i=n,a=Array.isArray(i),s=0,i=a?i:i[Symbol.iterator]();;){var u;if(a){if(s>=i.length)break;u=i[s++]}else{if(s=i.next(),s.done)break;u=s.value}var c=u;c.name===e&&(t.push(c),r.push(c.run()))}for(var d=t,l=Array.isArray(d),f=0,d=l?d:d[Symbol.iterator]();;){var m;if(l){if(f>=d.length)break;m=d[f++]}else{if(f=d.next(),f.done)break;m=f.value}var w=m;n.splice(n.indexOf(w),1)}return o.SyncPromise.all(r).then(function(){})}}}Object.defineProperty(n,"__esModule",{value:!0}),n.cleanup=t;var o=r(6)},function(e,n,r){"use strict";function t(e,n){return"string"==typeof e?!(0,o.isRegex)(n)&&(!Array.isArray(n)&&(e===i.CONSTANTS.WILDCARD||n===e)):(0,o.isRegex)(e)?(0,o.isRegex)(n)?e.toString()===n.toString():!Array.isArray(n)&&n.match(e):!!Array.isArray(e)&&(!(0,o.isRegex)(n)&&(Array.isArray(n)?JSON.stringify(e)===JSON.stringify(n):e.indexOf(n)!==-1))}Object.defineProperty(n,"__esModule",{value:!0}),n.matchDomain=t;var o=r(4),i=r(0)},function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.promise=n.Promise=void 0;var t=r(6),o=r(18),i=n.Promise=t.SyncPromise,a=n.promise={Promise:i,run:function(e){return i.resolve().then(e)},nextTick:function(e){return new i(function(n,r){(0,o.nextTick)(function(){return a.run(e).then(n,r)})})},method:function(e){return function(){var n=this,r=arguments;return i.resolve().then(function(){return e.apply(n,r)})}},nodeify:function(e,n){if(!n)return e;e.then(function(e){n(null,e)},function(e){n(e)})},deNodeify:function(e){for(var n=arguments.length,r=Array(n>1?n-1:0),t=1;t<n;t++)r[t-1]=arguments[t];return new i(function(n,t){try{return r.length<e.length?e.apply(void 0,r.concat([function(e,r){return e?t(e):n(r)}])):a.run(function(){return e.apply(void 0,r)}).then(n,t)}catch(e){return t(e)}})},map:function(e,n){for(var r=[],t=0;t<e.length;t++)!function(t){r.push(a.run(function(){return n(e[t])}))}(t);return i.all(r)}}},function(e,n,r){"use strict";function t(e){s.push(e),window.postMessage(a,i.CONSTANTS.WILDCARD)}Object.defineProperty(n,"__esModule",{value:!0}),n.nextTick=t;var o=r(4),i=r(0),a="__nextTick__postRobot__"+o.util.uniqueID(),s=[];window.addEventListener("message",function(e){if(e.data===a){s.shift().call()}})},function(e,n,r){"use strict";var t=r(0),o=r(1),i=r(2),a=r(5);i.global.openTunnelToParent=function(e){var n=e.name,r=e.source,i=e.canary,s=e.sendMessage,u=(0,o.getParent)(window);if(!u)throw new Error("No parent window found to open tunnel to");return(0,a.send)(u,t.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL,{name:n,sendMessage:function(){if(!(0,o.isWindowClosed)(r)){try{i()}catch(e){return}s.apply(this,arguments)}}},{domain:t.CONSTANTS.WILDCARD})}},function(e,n,r){"use strict";function t(e){return i.SyncPromise.try(function(){for(var n=(0,s.getFrames)(e),r=Array.isArray(n),t=0,n=r?n:n[Symbol.iterator]();;){var o;if(r){if(t>=n.length)break;o=n[t++]}else{if(t=n.next(),t.done)break;o=t.value}var u=o;try{if(u&&u!==window&&(0,s.isSameDomain)(u)&&u[a.CONSTANTS.WINDOW_PROPS.POSTROBOT])return u}catch(e){continue}}try{var d=(0,s.getFrameByName)(e,(0,c.getBridgeName)(s.util.getDomain()));if(!d)return;return(0,s.isSameDomain)(d)&&d[a.CONSTANTS.WINDOW_PROPS.POSTROBOT]?d:new i.SyncPromise(function(e){var n=void 0;n=setInterval(function(){if((0,s.isSameDomain)(d)&&d[a.CONSTANTS.WINDOW_PROPS.POSTROBOT])return clearInterval(n),clearTimeout(void 0),e(d);setTimeout(function(){return clearInterval(n),e()},2e3)},100)})}catch(e){return}})}function o(){return i.SyncPromise.try(function(){var e=(0,s.getOpener)(window);if(e&&(0,c.needsBridge)({win:e}))return(0,c.registerRemoteWindow)(e),t(e).then(function(n){return n?window.name?n[a.CONSTANTS.WINDOW_PROPS.POSTROBOT].openTunnelToParent({name:window.name,source:window,canary:function(){},sendMessage:function(e){window&&!window.closed&&(0,u.receiveMessage)({data:e,origin:this.origin,source:this.source})}}).then(function(n){var r=n.source,t=n.origin,o=n.data;if(r!==e)throw new Error("Source does not match opener");(0,c.registerRemoteSendMessage)(r,t,o.sendMessage)}).catch(function(n){throw(0,c.rejectRemoteSendMessage)(e,n),n}):(0,c.rejectRemoteSendMessage)(e,new Error("Can not register with opener: window does not have a name")):(0,c.rejectRemoteSendMessage)(e,new Error("Can not register with opener: no bridge found in opener"))})})}Object.defineProperty(n,"__esModule",{value:!0}),n.openTunnelToOpener=o;var i=r(6),a=r(0),s=r(1),u=r(3),c=r(8)},function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=(n.openBridge=void 0,n.linkUrl=void 0,n.isBridge=void 0,n.needsBridge=void 0,n.needsBridgeForBrowser=void 0,n.needsBridgeForWin=void 0,n.needsBridgeForDomain=void 0,n.openTunnelToOpener=void 0,n.destroyBridges=void 0,r(9));n.openBridge=t.openBridge,n.linkUrl=t.linkUrl,n.isBridge=t.isBridge,n.needsBridge=t.needsBridge,n.needsBridgeForBrowser=t.needsBridgeForBrowser,n.needsBridgeForWin=t.needsBridgeForWin,n.needsBridgeForDomain=t.needsBridgeForDomain,n.openTunnelToOpener=t.openTunnelToOpener,n.destroyBridges=t.destroyBridges},function(e,n,r){"use strict";function t(e,n){(0,f.on)(c.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL,{source:e,domain:n},function(e){var r=e.origin,t=e.data;if(r!==n)throw new Error("Domain "+n+" does not match origin "+r);if(!t.name)throw new Error("Register window expected to be passed window name");if(!t.sendMessage)throw new Error("Register window expected to be passed sendMessage method");var o=l.global.popupWindows[t.name];if(!o)throw new Error("Window with name "+t.name+" does not exist, or was not opened by this window");if(!o.domain)throw new Error("We do not have a registered domain for window "+t.name);if(o.domain!==r)throw new Error("Message origin "+r+" does not matched registered window origin "+o.domain);return(0,w.registerRemoteSendMessage)(o.win,n,t.sendMessage),{sendMessage:function(e){window&&!window.closed&&(0,m.receiveMessage)({data:e,origin:o.domain,source:o.win})}}})}function o(e,n){d.log.debug("Opening bridge:",e,n);var r=document.createElement("iframe");return r.setAttribute("name",e),r.setAttribute("id",e),r.setAttribute("style","display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"),r.setAttribute("frameborder","0"),r.setAttribute("border","0"),r.setAttribute("scrolling","no"),r.setAttribute("allowTransparency","true"),r.setAttribute("tabindex","-1"),r.setAttribute("hidden","true"),r.setAttribute("title",""),r.setAttribute("role","presentation"),r.src=n,r}function i(e,n){return n=n||d.util.getDomainFromUrl(e),l.global.bridges[n]?l.global.bridges[n]:l.global.clean.setItem(l.global.bridges,n,d.promise.run(function(){if(d.util.getDomain()===n)throw new Error("Can not open bridge on the same domain as current domain: "+n);var r=(0,w.getBridgeName)(n);if((0,d.getFrameByName)(window,r))throw new Error("Frame with name "+r+" already exists on page");var i=o(r,e);return w.documentBodyReady.then(function(r){return new d.promise.Promise(function(e,n){setTimeout(e,1)}).then(function(){r.appendChild(i),l.global.clean.register("bridgeFrames",function(){r.removeChild(i),delete l.global.bridges[n]});var o=i.contentWindow;return t(o,n),new d.promise.Promise(function(e,n){i.onload=e,i.onerror=n}).then(function(){return(0,d.onWindowReady)(o,c.CONFIG.BRIDGE_TIMEOUT,"Bridge "+e)}).then(function(){return o})})})}))}function a(){return l.global.clean.run("bridgeFrames")}function s(e,n){for(var r=Object.keys(l.global.popupWindows),t=Array.isArray(r),o=0,r=t?r:r[Symbol.iterator]();;){var i;if(t){if(o>=r.length)break;i=r[o++]}else{if(o=r.next(),o.done)break;i=o.value}var a=i,s=l.global.popupWindows[a];if(s.win===e){s.domain=d.util.getDomainFromUrl(n),(0,w.registerRemoteWindow)(e);break}}}Object.defineProperty(n,"__esModule",{value:!0});var u=function(){function e(e,n){var r=[],t=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(t=(a=s.next()).done)&&(r.push(a.value),!n||r.length!==n);t=!0);}catch(e){o=!0,i=e}finally{try{!t&&s.return&&s.return()}finally{if(o)throw i}}return r}return function(n,r){if(Array.isArray(n))return n;if(Symbol.iterator in Object(n))return e(n,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();n.openBridge=i,n.destroyBridges=a,n.linkUrl=s;var c=r(0),d=r(1),l=r(2),f=r(5),m=r(3),w=r(8);l.global.bridges=l.global.bridges||{},l.global.popupWindows=l.global.popupWindows||{};var p=window.open;window.open=function(e,n,r,t){var o=e;if(e&&0===e.indexOf(c.CONSTANTS.MOCK_PROTOCOL)){var i=e.split("|"),a=u(i,2);o=a[0],e=a[1]}o&&(o=d.util.getDomainFromUrl(o));var s=p.call(this,e,n,r,t);return e&&(0,w.registerRemoteWindow)(s),n&&l.global.clean.setItem(l.global.popupWindows,n,{win:s,domain:o}),s}},function(e,n,r){"use strict";function t(e,n){if(!o.CONFIG.ALLOW_POSTMESSAGE_POPUP&&(0,i.isSameTopWindow)(e,n)===!1)throw new Error("Can not send and receive post messages between two different windows (disabled to emulate IE)")}Object.defineProperty(n,"__esModule",{value:!0}),n.emulateIERestrictions=t;var o=r(0),i=r(1)},function(e,n,r){"use strict";function t(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}Object.defineProperty(n,"__esModule",{value:!0}),n.CONFIG=void 0;var o,i=r(12),a=n.CONFIG={ALLOW_POSTMESSAGE_POPUP:!0,LOG_LEVEL:"info",BRIDGE_TIMEOUT:5e3,ACK_TIMEOUT:1e3,LOG_TO_PAGE:!1,MOCK_MODE:!1,ALLOWED_POST_MESSAGE_METHODS:(o={},t(o,i.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE,!0),t(o,i.CONSTANTS.SEND_STRATEGIES.BRIDGE,!0),t(o,i.CONSTANTS.SEND_STRATEGIES.GLOBAL,!0),o)};0===window.location.href.indexOf(i.CONSTANTS.FILE_PROTOCOL)&&(a.ALLOW_POSTMESSAGE_POPUP=!0)},function(e,n,r){"use strict";function t(e){try{e=(0,u.jsonParse)(e)}catch(e){return}if(e&&(e=e[s.CONSTANTS.WINDOW_PROPS.POSTROBOT])&&e.type&&d.RECEIVE_MESSAGE_TYPES[e.type])return e}function o(e){if(!window||window.closed)throw new Error("Message recieved in closed window");try{if(!e.source)return}catch(e){return}var n=e.source,r=e.origin,o=e.data,i=t(o);if(i&&(0!==i.sourceDomain.indexOf(s.CONSTANTS.MOCK_PROTOCOL)&&0!==i.sourceDomain.indexOf(s.CONSTANTS.FILE_PROTOCOL)||(r=i.sourceDomain),c.global.receivedMessages.indexOf(i.id)===-1)){c.global.clean.push(c.global.receivedMessages,i.id);var a=void 0;if(a=s.POST_MESSAGE_NAMES_LIST.indexOf(i.name)!==-1||i.type===s.CONSTANTS.POST_MESSAGE_TYPE.ACK?"debug":"error"===i.ack?"error":"info",u.log.logLevel(a,["\n\n\t","#receive",i.type.replace(/^postrobot_message_/,""),"::",i.name,"::",r,"\n\n",i]),(0,u.isWindowClosed)(n))return u.log.debug("Source window is closed - can not send "+i.type+" "+i.name);i.data&&(i.data=(0,u.deserializeMethods)(n,r,i.data)),d.RECEIVE_MESSAGE_TYPES[i.type](n,r,i)}}function i(e){try{e.source}catch(e){return}e={source:e.source||e.sourceElement,origin:e.origin||e.originalEvent.origin,data:e.data};try{r(11).emulateIERestrictions(e.source,window)}catch(e){return}o(e)}function a(){var e=u.util.listen(window,"message",i);c.global.clean.register("listener",function(){e.cancel()})}Object.defineProperty(n,"__esModule",{value:!0}),n.receiveMessage=o,n.messageListener=i,n.listenForMessages=a;var s=r(0),u=r(1),c=r(2),d=r(26);c.global.receivedMessages=c.global.receivedMessages||[]},function(e,n,r){"use strict";function t(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}Object.defineProperty(n,"__esModule",{value:!0}),n.RECEIVE_MESSAGE_TYPES=void 0;var o,i=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},a=r(0),s=r(1),u=r(14),c=r(13);n.RECEIVE_MESSAGE_TYPES=(o={},t(o,a.CONSTANTS.POST_MESSAGE_TYPE.ACK,function(e,n,r){var t=c.listeners.response[r.hash];if(!t)throw new Error("No handler found for post message ack for message: "+r.name+" from "+n+" in "+window.location.protocol+"//"+window.location.host+window.location.pathname);if(!(0,s.matchDomain)(t.domain,n))throw new Error("Ack origin "+n+" does not match domain "+t.domain);t.ack=!0}),t(o,a.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,function(e,n,r){function t(t){return r.fireAndForget||(0,s.isWindowClosed)(e)?s.promise.Promise.resolve():(0,u.sendMessage)(e,i({target:r.originalSource,hash:r.hash,name:r.name},t),n)}var o=(0,c.getRequestListener)(r.name,e,n);return s.promise.Promise.all([t({type:a.CONSTANTS.POST_MESSAGE_TYPE.ACK}),s.promise.run(function(){if(!o)throw new Error("No handler found for post message: "+r.name+" from "+n+" in "+window.location.protocol+"//"+window.location.host+window.location.pathname);if(!(0,s.matchDomain)(o.domain,n))throw new Error("Request origin "+n+" does not match domain "+o.domain);var t=r.data;return s.promise.deNodeify(o.handler,{source:e,origin:n,data:t})}).then(function(e){return t({type:a.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,ack:a.CONSTANTS.POST_MESSAGE_ACK.SUCCESS,data:e})},function(e){return t({type:a.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,ack:a.CONSTANTS.POST_MESSAGE_ACK.ERROR,error:e.stack?e.message+"\n"+e.stack:e.toString()})})]).catch(function(e){if(o&&o.handleError)return o.handleError(e);s.log.error(e.stack||e.toString())})}),t(o,a.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,function(e,n,r){var t=c.listeners.response[r.hash];if(!t)throw new Error("No handler found for post message response for message: "+r.name+" from "+n+" in "+window.location.protocol+"//"+window.location.host+window.location.pathname);if(!(0,s.matchDomain)(t.domain,n))throw new Error("Response origin "+n+" does not match domain "+t.domain);if(delete c.listeners.response[r.hash],r.ack===a.CONSTANTS.POST_MESSAGE_ACK.ERROR)return t.respond(new Error(r.error));if(r.ack===a.CONSTANTS.POST_MESSAGE_ACK.SUCCESS){var o=r.data||r.response;return t.respond(null,{source:e,origin:n,data:o})}}),o)},function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.SEND_MESSAGE_STRATEGIES=void 0;var t=r(0),o=r(1),i=n.SEND_MESSAGE_STRATEGIES={};i[t.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE]=function(e,n,i){try{r(11).emulateIERestrictions(window,e)}catch(e){return}var a=void 0;a=Array.isArray(i)?i:i?[i]:[t.CONSTANTS.WILDCARD],a=a.map(function(n){if(0===n.indexOf(t.CONSTANTS.MOCK_PROTOCOL)){if(!(0,o.isActuallySameDomain)(e))throw new Error("Attempting to send messsage to mock domain "+n+", but window is actually cross-domain");return o.util.getActualDomain(e)}return 0===n.indexOf(t.CONSTANTS.FILE_PROTOCOL)?t.CONSTANTS.WILDCARD:n}),a.forEach(function(r){return e.postMessage(n,r)})};var a=r(9).sendBridgeMessage;i[t.CONSTANTS.SEND_STRATEGIES.BRIDGE]=function(e,n,r){if((0,o.isSameDomain)(e))throw new Error("Post message through bridge disabled between same domain windows");if((0,o.isSameTopWindow)(window,e)!==!1)throw new Error("Can only use bridge to communicate between two different windows, not between frames");a(e,n,r)},i[t.CONSTANTS.SEND_STRATEGIES.GLOBAL]=function(e,n,r){if(!(0,o.isSameDomain)(e))throw new Error("Post message through global disabled between different domain windows");if((0,o.isSameTopWindow)(window,e)!==!1)throw new Error("Can only use global to communicate between two different windows, not between frames");var i=e[t.CONSTANTS.WINDOW_PROPS.POSTROBOT];if(!i)throw new Error("Can not find postRobot global on foreign window");return i.receiveMessage({source:window,origin:o.util.getDomain(),data:n})}},function(e,n,r){"use strict";function t(e,n){return"object"===(void 0===e?"undefined":d(e))&&null!==e&&e.__type__===n}function o(e,n,r,t){var o=f.util.uniqueID();return h.global.clean.setItem(h.global.methods,o,{destination:e,domain:n,method:r}),{__type__:l.CONSTANTS.SERIALIZATION_TYPES.METHOD,__id__:o,__name__:t}}function i(e){return{__type__:l.CONSTANTS.SERIALIZATION_TYPES.ERROR,__message__:e.stack||e.message||e.toString()}}function a(e,n,r){return f.util.replaceObject({obj:r},function(r,t){return"function"==typeof r?o(e,n,r,t):r instanceof Error?i(r):void 0}).obj}function s(e,n,r){function t(){var t=Array.prototype.slice.call(arguments);return p.log.debug("Call foreign method",r.__name__,t),(0,w.send)(e,l.CONSTANTS.POST_MESSAGE_NAMES.METHOD,{id:r.__id__,name:r.__name__,args:t},{domain:n}).then(function(e){var n=e.data;return p.log.debug("Got foreign method result",r.__name__,n.result),n.result},function(e){throw p.log.debug("Got foreign method error",e.stack||e.toString()),e})}return t.__name__=r.__name__,t.source=e,t.origin=n,t}function u(e,n,r){return new Error(r.__message__)}function c(e,n,r){return f.util.replaceObject({obj:r},function(r,o){return t(r,l.CONSTANTS.SERIALIZATION_TYPES.METHOD)?s(e,n,r):t(r,l.CONSTANTS.SERIALIZATION_TYPES.ERROR)?u(e,n,r):void 0}).obj}Object.defineProperty(n,"__esModule",{value:!0}),n.listenForMethods=void 0;var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};n.serializeMethod=o,n.serializeMethods=a,n.deserializeMethod=s,n.deserializeError=u,n.deserializeMethods=c;var l=r(0),f=r(4),m=r(16),w=r(5),p=r(10),g=r(17),h=r(2);h.global.methods=h.global.methods||{};n.listenForMethods=f.util.once(function(){(0,w.on)(l.CONSTANTS.POST_MESSAGE_NAMES.METHOD,{window:l.CONSTANTS.WILDCARD,origin:l.CONSTANTS.WILDCARD},function(e){var n=e.source,r=e.origin,t=e.data,o=h.global.methods[t.id];if(!o)throw new Error("Could not find method with id: "+t.id);if(o.destination!==n)throw new Error("Method window does not match");if(!(0,m.matchDomain)(o.domain,r))throw new Error("Method domain "+o.domain+" does not match origin "+r);return p.log.debug("Call local method",t.name,t.args),g.promise.run(function(){return o.method.apply({source:n,origin:r,data:t},t.args)}).then(function(e){return{result:e,id:t.id,name:t.name}})})})},function(e,n,r){"use strict";function t(){(0,s.on)(i.CONSTANTS.POST_MESSAGE_NAMES.READY,{window:i.CONSTANTS.WILDCARD,domain:i.CONSTANTS.WILDCARD},function(e){for(var n=d.global.readyPromises,r=Array.isArray(n),t=0,n=r?n:n[Symbol.iterator]();;){var o;if(r){if(t>=n.length)break;o=n[t++]}else{if(t=n.next(),t.done)break;o=t.value}var i=o;if(i.win===e.source)return void i.promise.resolve(e)}d.global.clean.push(d.global.readyPromises,{win:e.source,promise:(new c.SyncPromise).resolve(e)})});var e=(0,a.getAncestor)();e&&(0,s.send)(e,i.CONSTANTS.POST_MESSAGE_NAMES.READY,{},{domain:i.CONSTANTS.WILDCARD}).catch(function(e){u.log.debug(e.stack||e.toString())})}function o(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5e3,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Window",t=d.global.readyPromises,o=Array.isArray(t),i=0,t=o?t:t[Symbol.iterator]();;){var a;if(o){if(i>=t.length)break;a=t[i++]}else{if(i=t.next(),i.done)break;a=i.value}var s=a;if(s.win===e)return s.promise}var u=new c.SyncPromise;return d.global.clean.push(d.global.readyPromises,{win:e,promise:u}),setTimeout(function(){return u.reject(new Error(r+" did not load after "+n+"ms"))},n),u}Object.defineProperty(n,"__esModule",{value:!0}),n.initOnReady=t,n.onWindowReady=o;var i=r(0),a=r(7),s=r(5),u=r(10),c=r(6),d=r(2);d.global.readyPromises=d.global.readyPromises||[]},function(e,n,r){"use strict";function t(e){return d.promise.nodeify(new d.promise.Promise(function(n,r){if(!e.name)throw new Error("Expected options.name");if(s.CONFIG.MOCK_MODE)e.window=window;else if("string"==typeof e.window){var t=document.getElementById(e.window);if(!t)throw new Error("Expected options.window "+e.window+" to be a valid element id");if("iframe"!==t.tagName.toLowerCase())throw new Error("Expected options.window "+e.window+" to be an iframe");if(!t.contentWindow)throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");e.window=t.contentWindow}else if(e.window instanceof HTMLElement){if("iframe"!==e.window.tagName.toLowerCase())throw new Error("Expected options.window "+e.window+" to be an iframe");if(!e.window.contentWindow)throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");e.window=e.window.contentWindow}if(!e.window)throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");e.domain=e.domain||s.CONSTANTS.WILDCARD;var o=e.name+"_"+d.util.uniqueID();if(c.global.clean.setItem(c.global.listeners.response,o,e),(0,d.isWindowClosed)(e.window))throw new Error("Target window is closed");var i=!1;return e.respond=function(e,t){return e||(i=!0),e?r(e):n(t)},d.promise.run(function(){if((0,d.isAncestor)(window,e.window))return(0,d.onWindowReady)(e.window)}).then(function(){if((0,u.sendMessage)(e.window,{hash:o,type:s.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,name:e.name,data:e.data,fireAndForget:e.fireAndForget},e.domain).catch(r),e.fireAndForget)return n();var t=d.util.intervalTimeout(s.CONFIG.ACK_TIMEOUT,100,function(n){return e.ack||(0,d.isWindowClosed)(e.window)?t.cancel():n?void 0:r(new Error("No ack for postMessage "+e.name+" in "+s.CONFIG.ACK_TIMEOUT+"ms"))});if(e.timeout)var a=d.util.intervalTimeout(e.timeout,100,function(n){return i||(0,d.isWindowClosed)(e.window)?a.cancel():n?void 0:r(new Error("Post message response timed out after "+e.timeout+" ms"))},e.timeout)}).catch(r)}),e.callback)}function o(e,n,r,o,i){return i||(o||"function"!=typeof r?"function"==typeof o&&(i=o,o={}):(i=r,o={},r={})),o=o||{},o.window=e,o.name=n,o.data=r,o.callback=i,t(o)}function i(e,n,r,t){var i=(0,d.getAncestor)();return i?o(i,e,n,r,t):new d.promise.Promise(function(e,n){return n(new Error("Window does not have a parent"))})}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!e.window)throw new Error("Expected options.window");return{send:function(n,r,t){return o(e.window,n,r,e,t)}}}Object.defineProperty(n,"__esModule",{value:!0}),n.send=void 0,n.request=t,n.sendToParent=i,n.client=a;var s=r(0),u=r(3),c=r(2),d=r(1);n.send=o},function(e,n,r){"use strict";function t(){a.CONFIG.MOCK_MODE=!0}function o(){a.CONFIG.MOCK_MODE=!1}function i(){delete window[a.CONSTANTS.WINDOW_PROPS.POSTROBOT],window.removeEventListener("message",s.messageListener)}Object.defineProperty(n,"__esModule",{value:!0}),n.CONSTANTS=n.CONFIG=void 0,n.enableMockMode=t,n.disableMockMode=o;var a=r(0);Object.defineProperty(n,"CONFIG",{enumerable:!0,get:function(){return a.CONFIG}}),Object.defineProperty(n,"CONSTANTS",{enumerable:!0,get:function(){return a.CONSTANTS}}),n.disable=i;var s=r(3)},function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.winutil=n.util=n.bridge=n.parent=void 0;var t=r(30);Object.keys(t).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return t[e]}})});var o=r(33);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return o[e]}})});var i=r(31);Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return i[e]}})});var a=r(4);Object.defineProperty(n,"util",{enumerable:!0,get:function(){return a.util}});var s=r(7),u=function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n.default=e,n}(s);n.parent=(0,s.getAncestor)(),n.bridge=void 0;n.bridge=r(21);n.winutil=u},function(e,n,r){"use strict";function t(e){if(!e.name)throw new Error("Expected options.name");if(e.handler=e.handler||u.util.noop,e.errorHandler=e.errorHandler||function(e){throw e},e.once){var n=e.handler;e.handler=u.util.once(function(){return(0,c.removeRequestListener)(e),n.apply(this,arguments)})}var r=e.override||s.CONFIG.MOCK_MODE;if(e.source&&(e.window=e.source),e.domain=e.domain||s.CONSTANTS.WILDCARD,(0,c.addRequestListener)(e.name,e.window,e.domain,e,r),e.handleError=function(n){e.errorHandler(n)},e.window&&e.errorOnClose)var t=u.util.safeInterval(function(){(0,u.isWindowClosed)(e.window)&&(t.cancel(),e.handleError(new Error("Post message target window is closed")))},50);return{cancel:function(){(0,c.removeRequestListener)(e)}}}function o(e,n,r,o){return"function"==typeof n&&(o=r,r=n,n={}),n=n||{},n.name=e,n.handler=r||n.handler,n.errorHandler=o||n.errorHandler,t(n)}function i(e,n,r,o){"function"==typeof n&&(o=r,r=n,n={}),n=n||{},n.name=e,n.handler=r||n.handler,n.errorHandler=o||n.errorHandler,n.once=!0;var i=new u.promise.Promise(function(e,r){n.handler=n.handler||function(n){return e(n)},n.errorHandler=n.errorHandler||r}),a=t(n);return u.util.extend(i,a),i}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{on:function(n,r,t){return o(n,e,r,t)}}}Object.defineProperty(n,"__esModule",{value:!0}),n.on=void 0,n.listen=t,n.once=i,n.listener=a;var s=r(0),u=r(1),c=r(3);n.on=o},function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=r(5);Object.keys(t).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return t[e]}})});var o=function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n.default=e,n}(t);n.default=o}])});
//# sourceMappingURL=post-robot.ie.js.map      };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _ie = __webpack_require__(23);
        Object.keys(_ie).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _ie[key];
                }
            });
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var CONSTANTS = exports.CONSTANTS = {
            POST_MESSAGE_TYPE: {
                REQUEST: "postrobot_message_request",
                RESPONSE: "postrobot_message_response",
                ACK: "postrobot_message_ack"
            },
            POST_MESSAGE_ACK: {
                SUCCESS: "success",
                ERROR: "error"
            },
            POST_MESSAGE_NAMES: {
                METHOD: "postrobot_method",
                READY: "postrobot_ready",
                OPEN_TUNNEL: "postrobot_open_tunnel"
            },
            WINDOW_TYPES: {
                FULLPAGE: "fullpage",
                POPUP: "popup",
                IFRAME: "iframe"
            },
            WINDOW_PROPS: {
                POSTROBOT: "__postRobot__"
            },
            SERIALIZATION_TYPES: {
                METHOD: "postrobot_method",
                ERROR: "postrobot_error"
            },
            SEND_STRATEGIES: {
                POST_MESSAGE: "postrobot_post_message",
                BRIDGE: "postrobot_bridge",
                GLOBAL: "postrobot_global"
            },
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            BRIDGE_NAME_PREFIX: "__postrobot_bridge__",
            POSTROBOT_PROXY: "__postrobot_proxy__",
            WILDCARD: "*"
        };
        exports.POST_MESSAGE_NAMES_LIST = Object.keys(CONSTANTS.POST_MESSAGE_NAMES).map(function(key) {
            return CONSTANTS.POST_MESSAGE_NAMES[key];
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function resetListeners() {
            _global.global.listeners.request = [], _global.global.listeners.response = [];
        }
        function getRequestListener(name, win, domain) {
            for (var result = {}, _iterator = _global.global.listeners.request, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref = _i.value;
                }
                var requestListener = _ref;
                if (requestListener.name === name) {
                    var specifiedWin = requestListener.win && requestListener.win !== _conf.CONSTANTS.WILDCARD, specifiedDomain = requestListener.domain && requestListener.domain !== _conf.CONSTANTS.WILDCARD, matchedWin = specifiedWin && requestListener.win === win, matchedDomain = specifiedDomain && (0, 
                    _lib.matchDomain)(requestListener.domain, domain);
                    specifiedWin && specifiedDomain ? matchedWin && matchedDomain && (result.all = result.all || requestListener.options) : specifiedDomain ? matchedDomain && (result.domain = result.domain || requestListener.options) : specifiedWin ? matchedWin && (result.win = result.win || requestListener.options) : result.name = result.name || requestListener.options;
                }
            }
            return result.all || result.domain || result.win || result.name;
        }
        function removeRequestListener(options) {
            for (var _iterator2 = _global.global.listeners.request, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    if (_i2 = _iterator2.next(), _i2.done) break;
                    _ref2 = _i2.value;
                }
                var listener = _ref2;
                listener.options === options && _global.global.listeners.request.splice(_global.global.listeners.request.indexOf(listener), 1);
            }
        }
        function addRequestListener(name, win, domain, options, override) {
            var listener = getRequestListener(name, win, domain);
            if (listener) {
                if (!override) {
                    if (win) throw new Error("Request listener already exists for " + name + " on domain " + domain + " for specified window: " + (listener.win === win));
                    throw new Error("Request listener already exists for " + name + " on domain " + domain);
                }
                removeRequestListener(listener);
            }
            _global.global.clean.push(_global.global.listeners.request, {
                name: name,
                win: win,
                domain: domain,
                options: options
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.listeners = void 0, exports.resetListeners = resetListeners, exports.getRequestListener = getRequestListener, 
        exports.removeRequestListener = removeRequestListener, exports.addRequestListener = addRequestListener;
        var _global = __webpack_require__(2), _lib = __webpack_require__(1), _conf = __webpack_require__(0);
        _global.global.listeners = _global.global.listeners || {
            request: [],
            response: []
        };
        exports.listeners = _global.global.listeners;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        function buildMessage(win, message) {
            var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, id = _lib.util.uniqueID(), type = (0, 
            _lib.getWindowType)();
            return _extends({}, message, options, {
                sourceDomain: _lib.util.getDomain(window),
                id: message.id || id,
                windowType: type
            });
        }
        function sendMessage(win, message, domain) {
            return _lib.promise.run(function() {
                message = buildMessage(win, message, {
                    data: (0, _lib.serializeMethods)(win, domain, message.data),
                    domain: domain
                });
                var level = void 0;
                if (level = _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info", 
                _lib.log.logLevel(level, [ "\n\n\t", "#send", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", domain || _conf.CONSTANTS.WILDCARD, "\n\n", message ]), 
                _conf.CONFIG.MOCK_MODE) return delete message.target, window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
                    origin: _lib.util.getDomain(window),
                    source: window,
                    data: (0, _lib.jsonStringify)(message, 0, 2)
                });
                if (win === window) throw new Error("Attemping to send message to self");
                if ((0, _lib.isWindowClosed)(win)) throw new Error("Window is closed");
                _lib.log.debug("Running send message strategies", message);
                var messages = [], serializedMessage = (0, _lib.jsonStringify)(_defineProperty({}, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT, message), 0, 2);
                return _lib.promise.map(Object.keys(_strategies.SEND_MESSAGE_STRATEGIES), function(strategyName) {
                    return _lib.promise.run(function() {
                        if (!_conf.CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                        return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                    }).then(function() {
                        return messages.push(strategyName + ": success"), !0;
                    }, function(err) {
                        return messages.push(strategyName + ": " + (err.stack || err.toString()) + "\n"), 
                        !1;
                    });
                }).then(function(results) {
                    var success = _lib.util.some(results), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                    if (_lib.log.debug(status), !success) throw new Error(status);
                });
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
        exports.buildMessage = buildMessage, exports.sendMessage = sendMessage;
        var _conf = __webpack_require__(0), _lib = __webpack_require__(1), _strategies = __webpack_require__(27);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function cleanup(obj) {
            var tasks = [];
            return {
                getters: {
                    array: function() {
                        return [];
                    },
                    object: function() {
                        return {};
                    }
                },
                set: function(name, item) {
                    return obj[name] = item, this.register(function() {
                        delete obj[name];
                    }), item;
                },
                push: function(collection, item) {
                    return collection.push(item), this.register(function() {
                        var index = collection.indexOf(item);
                        index !== -1 && collection.splice(index, 1);
                    }), item;
                },
                setItem: function(mapping, key, item) {
                    return mapping[key] = item, this.register(function() {
                        delete mapping[key];
                    }), item;
                },
                register: function(name, method) {
                    method || (method = name, name = void 0), tasks.push({
                        complete: !1,
                        name: name,
                        run: function() {
                            if (!this.complete) return this.complete = !0, method();
                        }
                    });
                },
                hasTasks: function() {
                    return Boolean(tasks.filter(function(item) {
                        return !item.complete;
                    }).length);
                },
                all: function() {
                    for (var results = []; tasks.length; ) results.push(tasks.pop().run());
                    return _promise.SyncPromise.all(results).then(function() {});
                },
                run: function(name) {
                    for (var results = [], toClean = [], _iterator = tasks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref = _i.value;
                        }
                        var item = _ref;
                        item.name === name && (toClean.push(item), results.push(item.run()));
                    }
                    for (var _iterator2 = toClean, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            if (_i2 = _iterator2.next(), _i2.done) break;
                            _ref2 = _i2.value;
                        }
                        var _item = _ref2;
                        tasks.splice(tasks.indexOf(_item), 1);
                    }
                    return _promise.SyncPromise.all(results).then(function() {});
                }
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.cleanup = cleanup;
        var _promise = __webpack_require__(6);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function matchDomain(domain, origin) {
            return "string" == typeof domain ? !(0, _util.isRegex)(origin) && (!Array.isArray(origin) && (domain === _conf.CONSTANTS.WILDCARD || origin === domain)) : (0, 
            _util.isRegex)(domain) ? (0, _util.isRegex)(origin) ? domain.toString() === origin.toString() : !Array.isArray(origin) && origin.match(domain) : !!Array.isArray(domain) && (!(0, 
            _util.isRegex)(origin) && (Array.isArray(origin) ? JSON.stringify(domain) === JSON.stringify(origin) : domain.indexOf(origin) !== -1));
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.matchDomain = matchDomain;
        var _util = __webpack_require__(4), _conf = __webpack_require__(0);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.promise = exports.Promise = void 0;
        var _promise = __webpack_require__(6), _tick = __webpack_require__(18), Promise = exports.Promise = _promise.SyncPromise, promise = exports.promise = {
            Promise: Promise,
            run: function(method) {
                return Promise.resolve().then(method);
            },
            nextTick: function(method) {
                return new Promise(function(resolve, reject) {
                    (0, _tick.nextTick)(function() {
                        return promise.run(method).then(resolve, reject);
                    });
                });
            },
            method: function(_method) {
                return function() {
                    var _this = this, _arguments = arguments;
                    return Promise.resolve().then(function() {
                        return _method.apply(_this, _arguments);
                    });
                };
            },
            nodeify: function(prom, callback) {
                if (!callback) return prom;
                prom.then(function(result) {
                    callback(null, result);
                }, function(err) {
                    callback(err);
                });
            },
            deNodeify: function(method) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
                return new Promise(function(resolve, reject) {
                    try {
                        return args.length < method.length ? method.apply(void 0, args.concat([ function(err, result) {
                            return err ? reject(err) : resolve(result);
                        } ])) : promise.run(function() {
                            return method.apply(void 0, args);
                        }).then(resolve, reject);
                    } catch (err) {
                        return reject(err);
                    }
                });
            },
            map: function(items, method) {
                for (var results = [], i = 0; i < items.length; i++) !function(i) {
                    results.push(promise.run(function() {
                        return method(items[i]);
                    }));
                }(i);
                return Promise.all(results);
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function nextTick(method) {
            queue.push(method), window.postMessage(tickMessageName, _conf.CONSTANTS.WILDCARD);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.nextTick = nextTick;
        var _util = __webpack_require__(4), _conf = __webpack_require__(0), tickMessageName = "__nextTick__postRobot__" + _util.util.uniqueID(), queue = [];
        window.addEventListener("message", function(event) {
            if (event.data === tickMessageName) {
                queue.shift().call();
            }
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _conf = __webpack_require__(0), _lib = __webpack_require__(1), _global = __webpack_require__(2), _interface = __webpack_require__(5);
        _global.global.openTunnelToParent = function(_ref) {
            var name = _ref.name, source = _ref.source, canary = _ref.canary, _sendMessage = _ref.sendMessage, remoteWindow = (0, 
            _lib.getParent)(window);
            if (!remoteWindow) throw new Error("No parent window found to open tunnel to");
            return (0, _interface.send)(remoteWindow, _conf.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                name: name,
                sendMessage: function() {
                    if (!(0, _lib.isWindowClosed)(source)) {
                        try {
                            canary();
                        } catch (err) {
                            return;
                        }
                        _sendMessage.apply(this, arguments);
                    }
                }
            }, {
                domain: _conf.CONSTANTS.WILDCARD
            });
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function getRemoteBridgeForWindow(win) {
            return _promise.SyncPromise.try(function() {
                for (var _iterator = (0, _lib.getFrames)(win), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var _frame = _ref;
                    try {
                        if (_frame && _frame !== window && (0, _lib.isSameDomain)(_frame) && _frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) return _frame;
                    } catch (err) {
                        continue;
                    }
                }
                try {
                    var frame = (0, _lib.getFrameByName)(win, (0, _common.getBridgeName)(_lib.util.getDomain()));
                    if (!frame) return;
                    return (0, _lib.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] ? frame : new _promise.SyncPromise(function(resolve) {
                        var interval = void 0;
                        interval = setInterval(function() {
                            if ((0, _lib.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) return clearInterval(interval), 
                            clearTimeout(void 0), resolve(frame);
                            setTimeout(function() {
                                return clearInterval(interval), resolve();
                            }, 2e3);
                        }, 100);
                    });
                } catch (err) {
                    return;
                }
            });
        }
        function openTunnelToOpener() {
            return _promise.SyncPromise.try(function() {
                var opener = (0, _lib.getOpener)(window);
                if (opener && (0, _common.needsBridge)({
                    win: opener
                })) return (0, _common.registerRemoteWindow)(opener), getRemoteBridgeForWindow(opener).then(function(bridge) {
                    return bridge ? window.name ? bridge[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].openTunnelToParent({
                        name: window.name,
                        source: window,
                        canary: function() {},
                        sendMessage: function(message) {
                            window && !window.closed && (0, _drivers.receiveMessage)({
                                data: message,
                                origin: this.origin,
                                source: this.source
                            });
                        }
                    }).then(function(_ref2) {
                        var source = _ref2.source, origin = _ref2.origin, data = _ref2.data;
                        if (source !== opener) throw new Error("Source does not match opener");
                        (0, _common.registerRemoteSendMessage)(source, origin, data.sendMessage);
                    }).catch(function(err) {
                        throw (0, _common.rejectRemoteSendMessage)(opener, err), err;
                    }) : (0, _common.rejectRemoteSendMessage)(opener, new Error("Can not register with opener: window does not have a name")) : (0, 
                    _common.rejectRemoteSendMessage)(opener, new Error("Can not register with opener: no bridge found in opener"));
                });
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.openTunnelToOpener = openTunnelToOpener;
        var _promise = __webpack_require__(6), _conf = __webpack_require__(0), _lib = __webpack_require__(1), _drivers = __webpack_require__(3), _common = __webpack_require__(8);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var bridge = (exports.openBridge = void 0, exports.linkUrl = void 0, exports.isBridge = void 0, 
        exports.needsBridge = void 0, exports.needsBridgeForBrowser = void 0, exports.needsBridgeForWin = void 0, 
        exports.needsBridgeForDomain = void 0, exports.openTunnelToOpener = void 0, exports.destroyBridges = void 0, 
        __webpack_require__(9));
        exports.openBridge = bridge.openBridge, exports.linkUrl = bridge.linkUrl, exports.isBridge = bridge.isBridge, 
        exports.needsBridge = bridge.needsBridge, exports.needsBridgeForBrowser = bridge.needsBridgeForBrowser, 
        exports.needsBridgeForWin = bridge.needsBridgeForWin, exports.needsBridgeForDomain = bridge.needsBridgeForDomain, 
        exports.openTunnelToOpener = bridge.openTunnelToOpener, exports.destroyBridges = bridge.destroyBridges;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function listenForRegister(source, domain) {
            (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                source: source,
                domain: domain
            }, function(_ref) {
                var origin = _ref.origin, data = _ref.data;
                if (origin !== domain) throw new Error("Domain " + domain + " does not match origin " + origin);
                if (!data.name) throw new Error("Register window expected to be passed window name");
                if (!data.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
                var winDetails = _global.global.popupWindows[data.name];
                if (!winDetails) throw new Error("Window with name " + data.name + " does not exist, or was not opened by this window");
                if (!winDetails.domain) throw new Error("We do not have a registered domain for window " + data.name);
                if (winDetails.domain !== origin) throw new Error("Message origin " + origin + " does not matched registered window origin " + winDetails.domain);
                return (0, _common.registerRemoteSendMessage)(winDetails.win, domain, data.sendMessage), 
                {
                    sendMessage: function(message) {
                        window && !window.closed && (0, _drivers.receiveMessage)({
                            data: message,
                            origin: winDetails.domain,
                            source: winDetails.win
                        });
                    }
                };
            });
        }
        function openBridgeFrame(name, url) {
            _lib.log.debug("Opening bridge:", name, url);
            var iframe = document.createElement("iframe");
            return iframe.setAttribute("name", name), iframe.setAttribute("id", name), iframe.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), 
            iframe.setAttribute("frameborder", "0"), iframe.setAttribute("border", "0"), iframe.setAttribute("scrolling", "no"), 
            iframe.setAttribute("allowTransparency", "true"), iframe.setAttribute("tabindex", "-1"), 
            iframe.setAttribute("hidden", "true"), iframe.setAttribute("title", ""), iframe.setAttribute("role", "presentation"), 
            iframe.src = url, iframe;
        }
        function openBridge(url, domain) {
            return domain = domain || _lib.util.getDomainFromUrl(url), _global.global.bridges[domain] ? _global.global.bridges[domain] : _global.global.clean.setItem(_global.global.bridges, domain, _lib.promise.run(function() {
                if (_lib.util.getDomain() === domain) throw new Error("Can not open bridge on the same domain as current domain: " + domain);
                var name = (0, _common.getBridgeName)(domain);
                if ((0, _lib.getFrameByName)(window, name)) throw new Error("Frame with name " + name + " already exists on page");
                var iframe = openBridgeFrame(name, url);
                return _common.documentBodyReady.then(function(body) {
                    return new _lib.promise.Promise(function(resolve, reject) {
                        setTimeout(resolve, 1);
                    }).then(function() {
                        body.appendChild(iframe), _global.global.clean.register("bridgeFrames", function() {
                            body.removeChild(iframe), delete _global.global.bridges[domain];
                        });
                        var bridge = iframe.contentWindow;
                        return listenForRegister(bridge, domain), new _lib.promise.Promise(function(resolve, reject) {
                            iframe.onload = resolve, iframe.onerror = reject;
                        }).then(function() {
                            return (0, _lib.onWindowReady)(bridge, _conf.CONFIG.BRIDGE_TIMEOUT, "Bridge " + url);
                        }).then(function() {
                            return bridge;
                        });
                    });
                });
            }));
        }
        function destroyBridges() {
            return _global.global.clean.run("bridgeFrames");
        }
        function linkUrl(win, url) {
            for (var _iterator = Object.keys(_global.global.popupWindows), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref2 = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref2 = _i.value;
                }
                var name = _ref2, winOptions = _global.global.popupWindows[name];
                if (winOptions.win === win) {
                    winOptions.domain = _lib.util.getDomainFromUrl(url), (0, _common.registerRemoteWindow)(win);
                    break;
                }
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [], _n = !0, _d = !1, _e = void 0;
                try {
                    for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                    !i || _arr.length !== i); _n = !0) ;
                } catch (err) {
                    _d = !0, _e = err;
                } finally {
                    try {
                        !_n && _i.return && _i.return();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) return arr;
                if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }();
        exports.openBridge = openBridge, exports.destroyBridges = destroyBridges, exports.linkUrl = linkUrl;
        var _conf = __webpack_require__(0), _lib = __webpack_require__(1), _global = __webpack_require__(2), _interface = __webpack_require__(5), _drivers = __webpack_require__(3), _common = __webpack_require__(8);
        _global.global.bridges = _global.global.bridges || {}, _global.global.popupWindows = _global.global.popupWindows || {};
        var windowOpen = window.open;
        window.open = function(url, name, options, last) {
            var domain = url;
            if (url && 0 === url.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL)) {
                var _url$split = url.split("|"), _url$split2 = _slicedToArray(_url$split, 2);
                domain = _url$split2[0], url = _url$split2[1];
            }
            domain && (domain = _lib.util.getDomainFromUrl(domain));
            var win = windowOpen.call(this, url, name, options, last);
            return url && (0, _common.registerRemoteWindow)(win), name && _global.global.clean.setItem(_global.global.popupWindows, name, {
                win: win,
                domain: domain
            }), win;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function emulateIERestrictions(sourceWindow, targetWindow) {
            if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP && (0, _lib.isSameTopWindow)(sourceWindow, targetWindow) === !1) throw new Error("Can not send and receive post messages between two different windows (disabled to emulate IE)");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.emulateIERestrictions = emulateIERestrictions;
        var _conf = __webpack_require__(0), _lib = __webpack_require__(1);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.CONFIG = void 0;
        var _ALLOWED_POST_MESSAGE, _constants = __webpack_require__(12), CONFIG = exports.CONFIG = {
            ALLOW_POSTMESSAGE_POPUP: !0,
            LOG_LEVEL: "info",
            BRIDGE_TIMEOUT: 5e3,
            ACK_TIMEOUT: 1e3,
            LOG_TO_PAGE: !1,
            MOCK_MODE: !1,
            ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, !0), 
            _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.BRIDGE, !0), 
            _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.GLOBAL, !0), 
            _ALLOWED_POST_MESSAGE)
        };
        0 === window.location.href.indexOf(_constants.CONSTANTS.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function parseMessage(message) {
            try {
                message = (0, _lib.jsonParse)(message);
            } catch (err) {
                return;
            }
            if (message && (message = message[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) && message.type && _types.RECEIVE_MESSAGE_TYPES[message.type]) return message;
        }
        function receiveMessage(event) {
            if (!window || window.closed) throw new Error("Message recieved in closed window");
            try {
                if (!event.source) return;
            } catch (err) {
                return;
            }
            var source = event.source, origin = event.origin, data = event.data, message = parseMessage(data);
            if (message && (0 !== message.sourceDomain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) || (origin = message.sourceDomain), 
            _global.global.receivedMessages.indexOf(message.id) === -1)) {
                _global.global.clean.push(_global.global.receivedMessages, message.id);
                var level = void 0;
                if (level = _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info", 
                _lib.log.logLevel(level, [ "\n\n\t", "#receive", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", origin, "\n\n", message ]), 
                (0, _lib.isWindowClosed)(source)) return _lib.log.debug("Source window is closed - can not send " + message.type + " " + message.name);
                message.data && (message.data = (0, _lib.deserializeMethods)(source, origin, message.data)), 
                _types.RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
            }
        }
        function messageListener(event) {
            try {
                event.source;
            } catch (err) {
                return;
            }
            event = {
                source: event.source || event.sourceElement,
                origin: event.origin || event.originalEvent.origin,
                data: event.data
            };
            try {
                __webpack_require__(11).emulateIERestrictions(event.source, window);
            } catch (err) {
                return;
            }
            receiveMessage(event);
        }
        function listenForMessages() {
            var listener = _lib.util.listen(window, "message", messageListener);
            _global.global.clean.register("listener", function() {
                listener.cancel();
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.receiveMessage = receiveMessage, exports.messageListener = messageListener, 
        exports.listenForMessages = listenForMessages;
        var _conf = __webpack_require__(0), _lib = __webpack_require__(1), _global = __webpack_require__(2), _types = __webpack_require__(26);
        _global.global.receivedMessages = _global.global.receivedMessages || [];
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.RECEIVE_MESSAGE_TYPES = void 0;
        var _RECEIVE_MESSAGE_TYPE, _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _conf = __webpack_require__(0), _lib = __webpack_require__(1), _send = __webpack_require__(14), _listeners = __webpack_require__(13);
        exports.RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK, function(source, origin, message) {
            var options = _listeners.listeners.response[message.hash];
            if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
            if (!(0, _lib.matchDomain)(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain);
            options.ack = !0;
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST, function(source, origin, message) {
            function respond(data) {
                return message.fireAndForget || (0, _lib.isWindowClosed)(source) ? _lib.promise.Promise.resolve() : (0, 
                _send.sendMessage)(source, _extends({
                    target: message.originalSource,
                    hash: message.hash,
                    name: message.name
                }, data), origin);
            }
            var options = (0, _listeners.getRequestListener)(message.name, source, origin);
            return _lib.promise.Promise.all([ respond({
                type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
            }), _lib.promise.run(function() {
                if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!(0, _lib.matchDomain)(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain);
                var data = message.data;
                return _lib.promise.deNodeify(options.handler, {
                    source: source,
                    origin: origin,
                    data: data
                });
            }).then(function(data) {
                return respond({
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
                    data: data
                });
            }, function(err) {
                return respond({
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR,
                    error: err.stack ? err.message + "\n" + err.stack : err.toString()
                });
            }) ]).catch(function(err) {
                if (options && options.handleError) return options.handleError(err);
                _lib.log.error(err.stack || err.toString());
            });
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE, function(source, origin, message) {
            var options = _listeners.listeners.response[message.hash];
            if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
            if (!(0, _lib.matchDomain)(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + options.domain);
            if (delete _listeners.listeners.response[message.hash], message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR) return options.respond(new Error(message.error));
            if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
                var data = message.data || message.response;
                return options.respond(null, {
                    source: source,
                    origin: origin,
                    data: data
                });
            }
        }), _RECEIVE_MESSAGE_TYPE);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.SEND_MESSAGE_STRATEGIES = void 0;
        var _conf = __webpack_require__(0), _lib = __webpack_require__(1), SEND_MESSAGE_STRATEGIES = exports.SEND_MESSAGE_STRATEGIES = {};
        SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = function(win, serializedMessage, domain) {
            try {
                __webpack_require__(11).emulateIERestrictions(window, win);
            } catch (err) {
                return;
            }
            var domains = void 0;
            domains = Array.isArray(domain) ? domain : domain ? [ domain ] : [ _conf.CONSTANTS.WILDCARD ], 
            domains = domains.map(function(dom) {
                if (0 === dom.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL)) {
                    if (!(0, _lib.isActuallySameDomain)(win)) throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                    return _lib.util.getActualDomain(win);
                }
                return 0 === dom.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) ? _conf.CONSTANTS.WILDCARD : dom;
            }), domains.forEach(function(dom) {
                return win.postMessage(serializedMessage, dom);
            });
        };
        var sendBridgeMessage = __webpack_require__(9).sendBridgeMessage;
        SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.BRIDGE] = function(win, serializedMessage, domain) {
            if ((0, _lib.isSameDomain)(win)) throw new Error("Post message through bridge disabled between same domain windows");
            if ((0, _lib.isSameTopWindow)(window, win) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
            sendBridgeMessage(win, serializedMessage, domain);
        }, SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.GLOBAL] = function(win, serializedMessage, domain) {
            if (!(0, _lib.isSameDomain)(win)) throw new Error("Post message through global disabled between different domain windows");
            if ((0, _lib.isSameTopWindow)(window, win) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
            var foreignGlobal = win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];
            if (!foreignGlobal) throw new Error("Can not find postRobot global on foreign window");
            return foreignGlobal.receiveMessage({
                source: window,
                origin: _lib.util.getDomain(),
                data: serializedMessage
            });
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function isSerialized(item, type) {
            return "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && item.__type__ === type;
        }
        function serializeMethod(destination, domain, method, name) {
            var id = _util.util.uniqueID();
            return _global.global.clean.setItem(_global.global.methods, id, {
                destination: destination,
                domain: domain,
                method: method
            }), {
                __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD,
                __id__: id,
                __name__: name
            };
        }
        function serializeError(err) {
            return {
                __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR,
                __message__: err.stack || err.message || err.toString()
            };
        }
        function serializeMethods(destination, domain, obj) {
            return _util.util.replaceObject({
                obj: obj
            }, function(item, key) {
                return "function" == typeof item ? serializeMethod(destination, domain, item, key) : item instanceof Error ? serializeError(item) : void 0;
            }).obj;
        }
        function deserializeMethod(source, origin, obj) {
            function wrapper() {
                var args = Array.prototype.slice.call(arguments);
                return _log.log.debug("Call foreign method", obj.__name__, args), (0, _interface.send)(source, _conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                    id: obj.__id__,
                    name: obj.__name__,
                    args: args
                }, {
                    domain: origin
                }).then(function(_ref2) {
                    var data = _ref2.data;
                    return _log.log.debug("Got foreign method result", obj.__name__, data.result), data.result;
                }, function(err) {
                    throw _log.log.debug("Got foreign method error", err.stack || err.toString()), err;
                });
            }
            return wrapper.__name__ = obj.__name__, wrapper.source = source, wrapper.origin = origin, 
            wrapper;
        }
        function deserializeError(source, origin, obj) {
            return new Error(obj.__message__);
        }
        function deserializeMethods(source, origin, obj) {
            return _util.util.replaceObject({
                obj: obj
            }, function(item, key) {
                return isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR) ? deserializeError(source, origin, item) : void 0;
            }).obj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.listenForMethods = void 0;
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        exports.serializeMethod = serializeMethod, exports.serializeMethods = serializeMethods, 
        exports.deserializeMethod = deserializeMethod, exports.deserializeError = deserializeError, 
        exports.deserializeMethods = deserializeMethods;
        var _conf = __webpack_require__(0), _util = __webpack_require__(4), _domain = __webpack_require__(16), _interface = __webpack_require__(5), _log = __webpack_require__(10), _promise = __webpack_require__(17), _global = __webpack_require__(2);
        _global.global.methods = _global.global.methods || {};
        exports.listenForMethods = _util.util.once(function() {
            (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                window: _conf.CONSTANTS.WILDCARD,
                origin: _conf.CONSTANTS.WILDCARD
            }, function(_ref) {
                var source = _ref.source, origin = _ref.origin, data = _ref.data, meth = _global.global.methods[data.id];
                if (!meth) throw new Error("Could not find method with id: " + data.id);
                if (meth.destination !== source) throw new Error("Method window does not match");
                if (!(0, _domain.matchDomain)(meth.domain, origin)) throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                return _log.log.debug("Call local method", data.name, data.args), _promise.promise.run(function() {
                    return meth.method.apply({
                        source: source,
                        origin: origin,
                        data: data
                    }, data.args);
                }).then(function(result) {
                    return {
                        result: result,
                        id: data.id,
                        name: data.name
                    };
                });
            });
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function initOnReady() {
            (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.READY, {
                window: _conf.CONSTANTS.WILDCARD,
                domain: _conf.CONSTANTS.WILDCARD
            }, function(event) {
                for (var _iterator = _global.global.readyPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var item = _ref;
                    if (item.win === event.source) return void item.promise.resolve(event);
                }
                _global.global.clean.push(_global.global.readyPromises, {
                    win: event.source,
                    promise: new _promise.SyncPromise().resolve(event)
                });
            });
            var parent = (0, _windows.getAncestor)();
            parent && (0, _interface.send)(parent, _conf.CONSTANTS.POST_MESSAGE_NAMES.READY, {}, {
                domain: _conf.CONSTANTS.WILDCARD
            }).catch(function(err) {
                _log.log.debug(err.stack || err.toString());
            });
        }
        function onWindowReady(win) {
            for (var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", _iterator2 = _global.global.readyPromises, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    if (_i2 = _iterator2.next(), _i2.done) break;
                    _ref2 = _i2.value;
                }
                var item = _ref2;
                if (item.win === win) return item.promise;
            }
            var promise = new _promise.SyncPromise();
            return _global.global.clean.push(_global.global.readyPromises, {
                win: win,
                promise: promise
            }), setTimeout(function() {
                return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
            }, timeout), promise;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.initOnReady = initOnReady, exports.onWindowReady = onWindowReady;
        var _conf = __webpack_require__(0), _windows = __webpack_require__(7), _interface = __webpack_require__(5), _log = __webpack_require__(10), _promise = __webpack_require__(6), _global = __webpack_require__(2);
        _global.global.readyPromises = _global.global.readyPromises || [];
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function request(options) {
            return _lib.promise.nodeify(new _lib.promise.Promise(function(resolve, reject) {
                if (!options.name) throw new Error("Expected options.name");
                if (_conf.CONFIG.MOCK_MODE) options.window = window; else if ("string" == typeof options.window) {
                    var el = document.getElementById(options.window);
                    if (!el) throw new Error("Expected options.window " + options.window + " to be a valid element id");
                    if ("iframe" !== el.tagName.toLowerCase()) throw new Error("Expected options.window " + options.window + " to be an iframe");
                    if (!el.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                    options.window = el.contentWindow;
                } else if (options.window instanceof HTMLElement) {
                    if ("iframe" !== options.window.tagName.toLowerCase()) throw new Error("Expected options.window " + options.window + " to be an iframe");
                    if (!options.window.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                    options.window = options.window.contentWindow;
                }
                if (!options.window) throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");
                options.domain = options.domain || _conf.CONSTANTS.WILDCARD;
                var hash = options.name + "_" + _lib.util.uniqueID();
                if (_global.global.clean.setItem(_global.global.listeners.response, hash, options), 
                (0, _lib.isWindowClosed)(options.window)) throw new Error("Target window is closed");
                var hasResult = !1;
                return options.respond = function(err, result) {
                    return err || (hasResult = !0), err ? reject(err) : resolve(result);
                }, _lib.promise.run(function() {
                    if ((0, _lib.isAncestor)(window, options.window)) return (0, _lib.onWindowReady)(options.window);
                }).then(function() {
                    if ((0, _drivers.sendMessage)(options.window, {
                        hash: hash,
                        type: _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                        name: options.name,
                        data: options.data,
                        fireAndForget: options.fireAndForget
                    }, options.domain).catch(reject), options.fireAndForget) return resolve();
                    var ackTimeout = _lib.util.intervalTimeout(_conf.CONFIG.ACK_TIMEOUT, 100, function(remaining) {
                        return options.ack || (0, _lib.isWindowClosed)(options.window) ? ackTimeout.cancel() : remaining ? void 0 : reject(new Error("No ack for postMessage " + options.name + " in " + _conf.CONFIG.ACK_TIMEOUT + "ms"));
                    });
                    if (options.timeout) var timeout = _lib.util.intervalTimeout(options.timeout, 100, function(remaining) {
                        return hasResult || (0, _lib.isWindowClosed)(options.window) ? timeout.cancel() : remaining ? void 0 : reject(new Error("Post message response timed out after " + options.timeout + " ms"));
                    }, options.timeout);
                }).catch(reject);
            }), options.callback);
        }
        function _send(window, name, data, options, callback) {
            return callback || (options || "function" != typeof data ? "function" == typeof options && (callback = options, 
            options = {}) : (callback = data, options = {}, data = {})), options = options || {}, 
            options.window = window, options.name = name, options.data = data, options.callback = callback, 
            request(options);
        }
        function sendToParent(name, data, options, callback) {
            var win = (0, _lib.getAncestor)();
            return win ? _send(win, name, data, options, callback) : new _lib.promise.Promise(function(resolve, reject) {
                return reject(new Error("Window does not have a parent"));
            });
        }
        function client() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!options.window) throw new Error("Expected options.window");
            return {
                send: function(name, data, callback) {
                    return _send(options.window, name, data, options, callback);
                }
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.send = void 0, exports.request = request, exports.sendToParent = sendToParent, 
        exports.client = client;
        var _conf = __webpack_require__(0), _drivers = __webpack_require__(3), _global = __webpack_require__(2), _lib = __webpack_require__(1);
        exports.send = _send;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function enableMockMode() {
            _conf.CONFIG.MOCK_MODE = !0;
        }
        function disableMockMode() {
            _conf.CONFIG.MOCK_MODE = !1;
        }
        function disable() {
            delete window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT], window.removeEventListener("message", _drivers.messageListener);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.CONSTANTS = exports.CONFIG = void 0, exports.enableMockMode = enableMockMode, 
        exports.disableMockMode = disableMockMode;
        var _conf = __webpack_require__(0);
        Object.defineProperty(exports, "CONFIG", {
            enumerable: !0,
            get: function() {
                return _conf.CONFIG;
            }
        }), Object.defineProperty(exports, "CONSTANTS", {
            enumerable: !0,
            get: function() {
                return _conf.CONSTANTS;
            }
        }), exports.disable = disable;
        var _drivers = __webpack_require__(3);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.winutil = exports.util = exports.bridge = exports.parent = void 0;
        var _client = __webpack_require__(30);
        Object.keys(_client).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _client[key];
                }
            });
        });
        var _server = __webpack_require__(33);
        Object.keys(_server).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _server[key];
                }
            });
        });
        var _config = __webpack_require__(31);
        Object.keys(_config).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _config[key];
                }
            });
        });
        var _util = __webpack_require__(4);
        Object.defineProperty(exports, "util", {
            enumerable: !0,
            get: function() {
                return _util.util;
            }
        });
        var _windows = __webpack_require__(7), windowUtil = function(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }(_windows);
        exports.parent = (0, _windows.getAncestor)(), exports.bridge = void 0;
        exports.bridge = __webpack_require__(21);
        exports.winutil = windowUtil;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function listen(options) {
            if (!options.name) throw new Error("Expected options.name");
            if (options.handler = options.handler || _lib.util.noop, options.errorHandler = options.errorHandler || function(err) {
                throw err;
            }, options.once) {
                var handler = options.handler;
                options.handler = _lib.util.once(function() {
                    return (0, _drivers.removeRequestListener)(options), handler.apply(this, arguments);
                });
            }
            var override = options.override || _conf.CONFIG.MOCK_MODE;
            if (options.source && (options.window = options.source), options.domain = options.domain || _conf.CONSTANTS.WILDCARD, 
            (0, _drivers.addRequestListener)(options.name, options.window, options.domain, options, override), 
            options.handleError = function(err) {
                options.errorHandler(err);
            }, options.window && options.errorOnClose) var interval = _lib.util.safeInterval(function() {
                (0, _lib.isWindowClosed)(options.window) && (interval.cancel(), options.handleError(new Error("Post message target window is closed")));
            }, 50);
            return {
                cancel: function() {
                    (0, _drivers.removeRequestListener)(options);
                }
            };
        }
        function _on(name, options, handler, errorHandler) {
            return "function" == typeof options && (errorHandler = handler, handler = options, 
            options = {}), options = options || {}, options.name = name, options.handler = handler || options.handler, 
            options.errorHandler = errorHandler || options.errorHandler, listen(options);
        }
        function once(name, options, handler, errorHandler) {
            "function" == typeof options && (errorHandler = handler, handler = options, options = {}), 
            options = options || {}, options.name = name, options.handler = handler || options.handler, 
            options.errorHandler = errorHandler || options.errorHandler, options.once = !0;
            var prom = new _lib.promise.Promise(function(resolve, reject) {
                options.handler = options.handler || function(event) {
                    return resolve(event);
                }, options.errorHandler = options.errorHandler || reject;
            }), myListener = listen(options);
            return _lib.util.extend(prom, myListener), prom;
        }
        function listener() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                on: function(name, handler, errorHandler) {
                    return _on(name, options, handler, errorHandler);
                }
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.on = void 0, exports.listen = listen, exports.once = once, exports.listener = listener;
        var _conf = __webpack_require__(0), _lib = __webpack_require__(1), _drivers = __webpack_require__(3);
        exports.on = _on;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _interface = __webpack_require__(5);
        Object.keys(_interface).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _interface[key];
                }
            });
        });
        var INTERFACE = function(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }(_interface);
        exports.default = INTERFACE;
    } ]);
});
//# sourceMappingURL=post-robot.ie.js.map