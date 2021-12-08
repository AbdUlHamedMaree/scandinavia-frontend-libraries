export function number(floating?: boolean): number;
export function number(max: number, floating?: boolean): number;
export function number(min: number, max: number, floating?: boolean): number;

export function number(arg1?: number | boolean, arg2?: number | boolean, arg3?: boolean): number {
  if (typeof arg1 !== 'undefined') {
    if (typeof arg1 === 'boolean') {
      return helper(1, 1000, arg1);
    } else {
      if (typeof arg2 !== 'undefined') {
        if (typeof arg2 === 'boolean') {
          return helper(1, arg1, arg2);
        } else {
          if (typeof arg3 !== 'undefined') {
            if (typeof arg3 === 'boolean') {
              return helper(arg1, arg2, arg3);
            } else return helper(arg1, arg2, false);
          } else return helper(arg1, arg2, false);
        }
      } else return helper(1, arg1, false);
    }
  } else return helper(1, 1000, false);
}

const helper = (min: number, max: number, floating: boolean) =>
  floating
    ? Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)
    : Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
