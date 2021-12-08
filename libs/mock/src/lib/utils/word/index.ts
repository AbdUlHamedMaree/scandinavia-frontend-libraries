import { WORDS } from '../../constants/words';
import { pick } from '../or';

export const word = () => pick(...WORDS);
