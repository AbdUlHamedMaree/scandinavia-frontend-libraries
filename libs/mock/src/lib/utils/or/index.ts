import { number } from '../number';

export const pick = <T extends unknown>(...args: T[]): T => args[number(0, args.length)];
