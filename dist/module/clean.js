"use strict";

exports.__esModule = true;
exports.cleanUpWindow = cleanUpWindow;

var _src = require("belter/src");

var _global = require("./global");

function cleanUpWindow(win) {
  const requestPromises = (0, _global.windowStore)('requestPromises');

  for (const promise of requestPromises.get(win, [])) {
    promise.reject(new Error(`Window cleaned up before response`)).catch(_src.noop);
  }
}