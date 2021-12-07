/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export type CommonKeys<T extends object> = keyof T;
export type AllKeys<T> = T extends any ? keyof T : never;
export type Subtract<A, C> = A extends C ? never : A;

export type PickType<T, K extends AllKeys<T>> = T extends { [k in K]?: any } ? T[K] : never;

export type PickTypeOf<T, K extends string | number | symbol> = K extends AllKeys<T> ? PickType<T, K> : never;

export type MergeUnion<T extends object> = {
  [K in AllKeys<T>]: PickTypeOf<T, K>;
};
