/* eslint import/no-default-export: off */

import { getKarmaConfig } from 'grumbler-scripts/config/karma.conf';

import { WEBPACK_CONFIG_TEST } from './webpack.config';

export default function configKarma(karma : any): void {

    const karmaConfig = getKarmaConfig(karma, {
        basePath:__dirname,
        webpack:  WEBPACK_CONFIG_TEST
    });

    karma.set(karmaConfig);
}
