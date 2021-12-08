import { number } from '../number';

export const avatar = (s = 150, u = number(Math.pow(10, 4))) => `https://i.pravatar.cc/${s}?u=${u}`;
