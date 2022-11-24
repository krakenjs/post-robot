import {
  getWebpackConfig,
  // @ts-expect-error fixing later
  getNextVersion,
} from "@krakenjs/webpack-config-grumbler";
import { argv } from "yargs";

// import pkg from "./package.json";
const pkg = { version: "11.0.0" };
import globals from "./globals";

export const FILE_NAME = "post-robot";
export const MODULE_NAME = "postRobot";

const postRobotGlobals = {
  ...globals.__POST_ROBOT__,
  __GLOBAL_KEY__: `__post_robot_${getNextVersion(pkg, argv.level)}__`,
};

export const WEBPACK_CONFIG = getWebpackConfig({
  entry: "./src/index.ts",
  filename: `${FILE_NAME}.js`,
  modulename: MODULE_NAME,
  minify: false,
  vars: {
    ...globals,

    __POST_ROBOT__: {
      ...postRobotGlobals,
      __IE_POPUP_SUPPORT__: false,
      __GLOBAL_MESSAGE_SUPPORT__: false,
    },
  },
});

export const WEBPACK_CONFIG_MIN = getWebpackConfig({
  entry: "./src/index.ts",
  filename: `${FILE_NAME}.min.js`,
  modulename: MODULE_NAME,
  minify: true,
  vars: {
    ...globals,

    __POST_ROBOT__: {
      ...postRobotGlobals,
      __IE_POPUP_SUPPORT__: false,
      __GLOBAL_MESSAGE_SUPPORT__: false,
    },
  },
});

export const WEBPACK_CONFIG_IE = getWebpackConfig({
  entry: "./src/index.ts",
  filename: `${FILE_NAME}.ie.js`,
  modulename: MODULE_NAME,
  minify: false,
  vars: {
    ...globals,
    __POST_ROBOT__: postRobotGlobals,
  },
});

export const WEBPACK_CONFIG_IE_MIN = getWebpackConfig({
  entry: "./src/index.ts",
  filename: `${FILE_NAME}.ie.min.js`,
  modulename: MODULE_NAME,
  minify: true,
  vars: {
    ...globals,
    __POST_ROBOT__: postRobotGlobals,
  },
});

export const WEBPACK_CONFIG_TEST = getWebpackConfig({
  entry: "./src/index.ts",
  mode: "test",
  modulename: MODULE_NAME,
  minify: false,
  test: true,
  vars: {
    ...globals,
    __POST_ROBOT__: postRobotGlobals,
    __TEST__: true,
  },
});

export default [
  WEBPACK_CONFIG,
  WEBPACK_CONFIG_MIN,
  WEBPACK_CONFIG_IE,
  WEBPACK_CONFIG_IE_MIN,
];
