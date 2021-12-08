import { array } from '../array';
import { word } from '../word';

export const lorem = (count = 6) => array(() => word(), count).join(' ');
