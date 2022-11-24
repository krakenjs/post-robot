import { getKarmaConfig } from "@krakenjs/karma-config-grumbler";

import { WEBPACK_CONFIG_TEST } from "./webpack.config";

export default function configKarma(karma) {
  const karmaConfig = getKarmaConfig(karma, {
    basePath: __dirname,
    webpack: WEBPACK_CONFIG_TEST,
  });

  console.log(karmaConfig);
  karma.set(karmaConfig);
}
