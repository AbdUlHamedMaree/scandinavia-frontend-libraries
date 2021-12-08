import { number } from '../number';

export const phone = (num = 10) => number(10 ** num, 10 ** (num + 1) - 1);
