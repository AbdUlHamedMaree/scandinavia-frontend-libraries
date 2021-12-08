import { number } from '../number';

export const array = <TFunc extends () => ReturnType<TFunc>>(cb: TFunc, length = number(20, 40)) =>
  Array.from<never, ReturnType<TFunc>>({ length }, () => cb());
