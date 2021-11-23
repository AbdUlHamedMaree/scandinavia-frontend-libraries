import { AnyFunction } from '../../types';

export const one = (...arr: (AnyFunction | boolean | undefined)[]): AnyFunction | null => {
  return recursionOne(...arr.reverse());
};

const recursionOne = (...arr: (AnyFunction | boolean | undefined)[]): AnyFunction | null => {
  if (!arr.length) return null;
  const target = arr.pop();
  if (typeof target === 'function') return target;
  if (typeof target === 'boolean' && !target) return null;
  return recursionOne(...arr);
};
