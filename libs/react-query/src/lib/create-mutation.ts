/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationFunction, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError, AxiosRequestConfig as _AxiosRequestConfig } from 'axios';

import { CreateReactQueryHelpersConfig, Options, ApiError } from '../types';
import { defaultHandleError, defaultLogError, defaultToastError } from '../defaults';
import { one, resolveError } from '../utils';
import { QueryKey } from '../types';
import { replaceQuery } from '../utils/replace-query';

export type AxiosRequestConfig<D = any> = _AxiosRequestConfig<D> & {
  query?: Record<string, string>;
};

export const createMutation =
  ({ handleError, log, toast, axiosInstance }: Required<CreateReactQueryHelpersConfig>) =>
  <
    T = unknown,
    K = unknown,
    TConfig = AxiosRequestConfig<K> | MutationFunction<T, K>,
    TOpt = TConfig extends MutationFunction<T, K> ? K : AxiosRequestConfig<K>
  >(
    baseKey: QueryKey,
    baseAxiosConfig?: TConfig,
    baseMutationOptions?: UseMutationOptions<T, ApiError, TOpt>,
    baseOptions?: Options
  ) =>
  (
    hookAxiosConfig?: AxiosRequestConfig<K>,
    hookMutationOptions?: UseMutationOptions<T, ApiError, TOpt>,
    hookOptions?: Options
  ) => {
    return useMutation<T, ApiError, TOpt>(
      baseKey,
      async arg => {
        try {
          if (baseAxiosConfig instanceof Function) {
            return await baseAxiosConfig(arg);
          } else {
            const config = arg as unknown as AxiosRequestConfig<K>;
            return (
              await axiosInstance.request<T>({
                ...baseAxiosConfig,
                ...hookAxiosConfig,
                ...config,
                url: replaceQuery(config.url ?? hookAxiosConfig?.url ?? (baseAxiosConfig as any)?.url)(
                  config.query ?? hookAxiosConfig?.query ?? (baseAxiosConfig as any)?.query
                ),
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
        ...baseMutationOptions,
        ...hookMutationOptions,
        onError: (...args) => {
          baseMutationOptions?.onError?.(...args);
          hookMutationOptions?.onError?.(...args);
        },
        onSuccess: (...args) => {
          baseMutationOptions?.onSuccess?.(...args);
          hookMutationOptions?.onSuccess?.(...args);
        },
        onMutate: (...args) => {
          baseMutationOptions?.onMutate?.(...args);
          hookMutationOptions?.onMutate?.(...args);
        },
        onSettled: (...args) => {
          baseMutationOptions?.onSettled?.(...args);
          hookMutationOptions?.onSettled?.(...args);
        },
      }
    );
  };
