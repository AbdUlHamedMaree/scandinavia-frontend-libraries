import { MutationFunction, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';

import { CreateReactQueryHelpersConfig, Options, ApiError } from '../types';
import { defaultHandleError, defaultLogError, defaultToastError } from '../defaults';
import { one, resolveError } from '../utils';
import { QueryKey } from '../types';

export const createMutation =
  ({ handleError, log, toast, axiosInstance }: Required<CreateReactQueryHelpersConfig>) =>
  <T = unknown, K = unknown, TConfig = (Omit<AxiosRequestConfig, 'data'> & { data?: K }) | MutationFunction<T, K>>(
    baseKey: QueryKey,
    baseAxiosConfig?: TConfig,
    baseMutationOptions?: UseMutationOptions<T, ApiError, Omit<AxiosRequestConfig, 'data'> & { data?: K }>,
    baseOptions?: Options
  ) =>
  (
    hookAxiosConfig?: Omit<AxiosRequestConfig, 'data'> & { data?: K },
    hookMutationOptions?: UseMutationOptions<T, ApiError, Omit<AxiosRequestConfig, 'data'> & { data?: K }>,
    hookOptions?: Options
  ) => {
    return useMutation<
      T,
      ApiError,
      TConfig extends (arg: K) => Promise<T>
        ? K
        : Omit<AxiosRequestConfig, 'data'> & {
            data?: K;
            setUrl?: (url: string) => string;
          }
    >(
      baseKey,
      async arg => {
        try {
          if (baseAxiosConfig instanceof Function) {
            return await baseAxiosConfig(arg);
          } else {
            const { setUrl, ...config } = arg as Omit<AxiosRequestConfig, 'data'> & {
              data?: K;
              setUrl?: (url: string) => string;
            };
            const url =
              config.url ??
              hookAxiosConfig?.url ??
              (baseAxiosConfig as Omit<AxiosRequestConfig, 'data'> & { data?: K })?.url ??
              '';

            return (
              await axiosInstance.request<T>({
                ...baseAxiosConfig,
                ...hookAxiosConfig,
                ...config,
                url: setUrl ? setUrl(url) : url,
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
