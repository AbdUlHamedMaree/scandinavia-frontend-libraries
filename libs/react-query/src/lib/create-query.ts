/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosRequestConfig as _AxiosRequestConfig } from 'axios';
import { QueryFunction, useQuery, UseQueryOptions } from 'react-query';

import { defaultHandleError, defaultLogError, defaultToastError } from '../defaults';
import { CreateReactQueryHelpersConfig, Options, ApiError } from '../types';
import { one, resolveError } from '../utils';
import { QueryKey } from '../types';
import { replaceQuery } from '../utils/replace-query';

export type AxiosRequestConfig<D = any> = _AxiosRequestConfig<D> & { query?: Record<string, string> };

export const createQuery =
  ({ handleError, log, toast, axiosInstance }: Required<CreateReactQueryHelpersConfig>) =>
  <T = unknown>(
    baseKey: QueryKey,
    baseAxiosConfig?: AxiosRequestConfig | QueryFunction<T, QueryKey>,
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
      async ctx => {
        try {
          if (baseAxiosConfig instanceof Function) return await baseAxiosConfig(ctx);
          else
            return (
              await axiosInstance.request<T>({
                ...baseAxiosConfig,
                ...hookAxiosConfig,
                url: replaceQuery(hookAxiosConfig?.url ?? baseAxiosConfig?.url)(
                  hookAxiosConfig?.query ?? baseAxiosConfig?.query
                ),
              })
            ).data;
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
            throw handleErrorFunc?.(err);
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
