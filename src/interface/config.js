
import { CONFIG } from '../conf';

export function enableMockMode() {
    CONFIG.MOCK_MODE = true;
}

export function disableMockMode() {
    CONFIG.MOCK_MODE = false;
}

export { CONFIG, CONSTANTS } from '../conf';