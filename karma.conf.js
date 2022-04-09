/* @flow */
/* eslint import/no-default-export: off */

import { getKarmaConfig } from '@krakenjs/grumbler-scripts/config/karma.conf';

import { WEBPACK_CONFIG_TEST } from './webpack.config';

export default function configKarma(karma : Object) {

    const karmaConfig = getKarmaConfig(karma, {
        basePath: __dirname,
        webpack:  WEBPACK_CONFIG_TEST
    });

    karma.set(karmaConfig);
}
