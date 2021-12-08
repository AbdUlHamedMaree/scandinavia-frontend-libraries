import { LAST_NAMES } from '../../constants/last-names';
import { pick } from '../or';

export const lastname = () => pick(...LAST_NAMES);
