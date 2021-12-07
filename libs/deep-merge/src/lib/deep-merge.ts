import { MergeUnion } from './types';

type Options = { overrideFunctions: boolean };
type Permeative = string | number | bigint | boolean | symbol | Date | null;

const defaultOptions: Options = { overrideFunctions: false };

const isFunction = (f: unknown): f is Function => typeof f === 'function';
const isSafeObject = (f: unknown): f is object => typeof f === 'object' && f !== null;
const isArray = (f: unknown): f is unknown[] => Array.isArray(f);
const isPermeative = (f: unknown): f is Permeative => permeative.includes(typeof f) || f instanceof Date || f === null;
const defined = <T>(f: T): f is Exclude<T, undefined> => typeof f !== 'undefined';

export const mergeFunctions =
  <F extends ((...args: any[]) => any) | undefined>(...funcs: F[]) =>
  (...args: F extends Function ? Parameters<F> : never) => {
    funcs.forEach(func => {
      func?.(...args);
    });
  };

const permeative = ['string', 'number', 'bigint', 'boolean', 'symbol'];

export const createDeepMerge =
  (options: Partial<Options>) =>
  <T extends Record<string, unknown> | undefined>(...args: T[]): MergeUnion<Exclude<T, undefined>> =>
    args.reduce((a, b) => deepMergeTwo(a, b, options), {} as any);

export const deepMerge = createDeepMerge(defaultOptions);

const deepMergeTwo = (a: any, b: any, _options: Partial<Options>) => {
  const options: Options = { ...defaultOptions, ..._options };
  defined(b) &&
    Object.keys(b).forEach(k => {
      if (defined(b[k])) {
        if (isPermeative(b[k])) a[k] = b[k];
        else if (isArray(b[k])) a[k] = isArray(a[k]) ? [...a[k], ...b[k]] : b[k];
        else if (isFunction(b[k]))
          a[k] = isFunction(a[k]) && options.overrideFunctions ? mergeFunctions(a[k], b[k]) : b[k];
        else if (isSafeObject(b[k])) a[k] = isSafeObject(a[k]) ? deepMergeTwo(a[k], b[k], options) : b[k];
        else a[k] = b[k];
      }
    });
  return a;
};
