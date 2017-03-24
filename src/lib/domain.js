
import { isRegex } from './util';
import { CONSTANTS } from '../conf';

export function matchDomain(domain, origin) {

    if (typeof domain === 'string') {

        if (isRegex(origin)) {
            return false;
        }

        if (Array.isArray(origin)) {
            return false;
        }

        return domain === CONSTANTS.WILDCARD || origin === domain;
    }

    if (isRegex(domain)) {

        if (isRegex(origin)) {
            return domain.toString() === origin.toString();
        }

        if (Array.isArray(origin)) {
            return false;
        }

        return origin.match(domain);
    }

    if (Array.isArray(domain)) {

        if (isRegex(origin)) {
            return false;
        }

        if (Array.isArray(origin)) {
            return JSON.stringify(domain) === JSON.stringify(origin);
        }

        return domain.indexOf(origin) !== -1;
    }

    return false;
}