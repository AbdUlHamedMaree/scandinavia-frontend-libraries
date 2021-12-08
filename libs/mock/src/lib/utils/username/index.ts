import { FEMALES_FIRST_NAME, MALES_FIRST_NAME } from '../../constants/first-names';
import { LAST_NAMES } from '../../constants/last-names';
import { pick } from '../or';

export const username = () =>
  `${pick(...MALES_FIRST_NAME, ...FEMALES_FIRST_NAME).toLowerCase()}_${pick(...LAST_NAMES).toLowerCase()}`;
