import { AxiosError } from 'axios';
import { ApiError } from '../types';

export const resolveError = (error: AxiosError) => {
  let toThrow: ApiError;
  if (error.response)
    toThrow = {
      ...error,
      errorType: 'response',
    };
  else if (error.request)
    toThrow = {
      ...error,
      errorType: 'request',
    };
  else toThrow = { ...error, errorType: 'unknown' };
  return toThrow;
};
