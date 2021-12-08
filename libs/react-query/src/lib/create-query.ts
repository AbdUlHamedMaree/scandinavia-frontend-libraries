import { AxiosError, AxiosRequestConfig } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { defaultHandleError, defaultLogError, defaultToastError } from '../defaults';
import { CreateReactQueryHelpersConfig, Options, ApiError } from '../types';
import { one, resolveError } from '../utils';
import { QueryKey } from '../types';

export const createQuery =
  ({ handleError, log, toast, axiosInstance }: Required<CreateReactQueryHelpersConfig>) =>
  <T = unknown>(
    baseKey: QueryKey,
    baseAxiosConfig?: AxiosRequestConfig | Promise<T>,
    baseQueryOptions?: UseQueryOptions<T, ApiError, T, QueryKey>,
    baseOptions?: Options
  ) =>
  (
    hookAxiosConfig?: AxiosRequestConfig,
    hookQueryOptions?: UseQueryOptions<T, ApiError, T, QueryKey>,
    hookOptions?: Options
  ) =>
    useQuery<T, ApiError, T, QueryKey>(
      baseKey,
      async () => {
        try {
          if (baseAxiosConfig instanceof Promise) {
            return await baseAxiosConfig;
          } else {
            return (
              await axiosInstance.request<T>({
                ...baseAxiosConfig,
                ...hookAxiosConfig,
              })
            ).data;
          }
        } catch (e) {
          if ((e as AxiosError)?.isAxiosError) {
            const err = resolveError(e as AxiosError);
            if (process.env.NODE_ENV !== 'production') {
              const logFunc = one(hookOptions?.log, baseOptions?.log, log, defaultLogError);
              logFunc && logFunc(err);
            }

            const toastFunc = one(hookOptions?.toast, baseOptions?.toast, toast, defaultToastError);
            toastFunc && toastFunc(err);

            const handleErrorFunc = one(handleError, defaultHandleError);
            throw handleErrorFunc && handleErrorFunc(err);
          } else throw e;
        }
      },
      {
        ...baseQueryOptions,
        ...hookQueryOptions,

        onError: (...args) => {
          baseQueryOptions?.onError?.(...args);
          hookQueryOptions?.onError?.(...args);
        },
        onSuccess: (...args) => {
          baseQueryOptions?.onSuccess?.(...args);
          hookQueryOptions?.onSuccess?.(...args);
        },
        onSettled: (...args) => {
          baseQueryOptions?.onSettled?.(...args);
          hookQueryOptions?.onSettled?.(...args);
        },
      }
    );
