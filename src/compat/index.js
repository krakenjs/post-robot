
export * from './bridge';
export * from './global';
export * from './ie';

import { Promise } from 'es6-promise-min';

window.Promise = window.Promise || Promise;