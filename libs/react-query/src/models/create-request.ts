import { AxiosRequestConfig as ARC } from 'axios';
import { Return, Options } from '.';
import { ApiError } from './api-error';

export type CreateRequest<T> = <K = T>(
  HC?: ARC,
  callbackError?: (error: ApiError) => void,
  callbackSuccess?: (data: K) => void,
  options?: Options
) => Return<K>;
