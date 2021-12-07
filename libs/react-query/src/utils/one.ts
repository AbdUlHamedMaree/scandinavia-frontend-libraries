/* eslint-disable @typescript-eslint/ban-types */

export const one = <T extends Function>(...arr: (T | boolean | undefined)[]): T | null => {
  return recursionOne(...arr.reverse());
};

const recursionOne = <T extends Function>(...arr: (T | boolean | undefined)[]): T | null => {
  if (!arr.length) return null;
  const target = arr.pop();
  if (typeof target === 'function') return target;
  if (typeof target === 'boolean' && !target) return null;
  return recursionOne(...arr);
};
