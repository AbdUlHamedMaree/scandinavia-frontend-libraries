import { number } from '../number';

export const image = (h = 300, w = 200, s: number | string = number(Math.pow(10, 10))) =>
  `https://picsum.photos/seed/${s}/${h}/${w}`;
