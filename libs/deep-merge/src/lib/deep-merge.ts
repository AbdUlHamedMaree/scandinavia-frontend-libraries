import { MergeUnion } from './types';

type Options = {
  shouldOverrideFunction: (key: string, source: Function, destination: Function) => boolean;
  shouldOverrideObject: (key: string, source: object, destination: object) => boolean;
  shouldOverrideArray: (key: string, source: any[], destination: any[]) => boolean;
};

const defaultOptions: Options = {
  shouldOverrideFunction: () => false,
  shouldOverrideObject: () => false,
  shouldOverrideArray: () => false,
};

const isFunction = (f: unknown): f is Function => typeof f === 'function';
const isSafeObject = (f: unknown): f is object => typeof f === 'object' && f !== null;
const isArray = (f: unknown): f is unknown[] => Array.isArray(f);

const defined = <T>(f: T): f is Exclude<T, undefined> => typeof f !== 'undefined';

const mergeFunctions =
  <F extends ((...args: any[]) => any) | undefined>(...funcs: F[]) =>
  (...args: F extends Function ? Parameters<F> : never): F extends Function ? ReturnType<F> : never => {
    return funcs
      .map(func => {
        return func?.(...args);
      })
      .filter(el => typeof el !== 'undefined')
      .pop();
  };

export const createDeepMerge =
  (options: Partial<Options> = {}) =>
  <T extends object | undefined>(...args: T[]): MergeUnion<Exclude<T, undefined>> =>
    args.reduce((a, b) => deepMergeTwo(a, b, { ...defaultOptions, ...options }), {} as any);

export const deepMerge = createDeepMerge();

const deepMergeTwo = (a: any, b: any, options: Options) => {
  defined(b) &&
    Object.keys(b).forEach(k => {
      if (defined(b[k])) {
        if (isSafeObject(b[k]))
          a[k] =
            isSafeObject(a[k]) && !options.shouldOverrideObject(k, a[k], b[k])
              ? deepMergeTwo(a[k], b[k], options)
              : b[k];
        else if (isArray(b[k]))
          a[k] = isArray(a[k]) && !options.shouldOverrideArray(k, a[k], b[k]) ? [...a[k], ...b[k]] : b[k];
        else if (isFunction(b[k]))
          a[k] = isFunction(a[k]) && !options.shouldOverrideFunction(k, a[k], b[k]) ? mergeFunctions(a[k], b[k]) : b[k];
        else a[k] = b[k];
      }
    });
  return a;
};
