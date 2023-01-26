// @ts-expect-error grumbler still needs types
import { getKarmaConfig } from "@krakenjs/karma-config-grumbler";

import { WEBPACK_CONFIG_TEST } from "./webpack.config";

export default function configKarma(karma: any) {
  const testDir = "test";
  const entry = `${testDir}/index.ts`;

  const karmaConfig = getKarmaConfig(karma, {
    basePath: __dirname,
    coverage: true,
    files: [
      {
        pattern: entry,
        included: true,
        served: true,
      },

      {
        pattern: `${testDir}/**/*.ts`,
        included: false,
        served: true,
      },

      {
        pattern: `${testDir}/**/*.tsx`,
        included: false,
        served: true,
      },

      {
        pattern: `${testDir}/**/*.htm`,
        included: false,
        served: true,
      },
    ],
    frameworks: ["mocha", "karma-typescript"],
    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.json",
    },
    webpack: WEBPACK_CONFIG_TEST,
  });

  karma.set(karmaConfig);
}
