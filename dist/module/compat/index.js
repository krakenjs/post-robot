'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ie = require('./ie');

Object.keys(_ie).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ie[key];
    }
  });
});