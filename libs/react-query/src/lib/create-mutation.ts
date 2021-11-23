import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';

import { CreateReactQueryHelpersConfig, Options, ApiError } from '../models';
import { defaultLogError, defaultToastError } from '../defaults';
import { one } from '../utils';
import { AnyObject, QueryKey } from '../types';


export const createMutation =
  ({ handleError, log, toast, axiosInstance }: Required<CreateReactQueryHelpersConfig>) =>
  <T extends AnyObject = AnyObject, K extends AnyObject = AnyObject>(
    baseKey: QueryKey,
    baseAxiosConfig?: Omit<AxiosRequestConfig, 'data'> & { data?: K },
    baseMutationOptions?: UseMutationOptions<T, ApiError, Omit<AxiosRequestConfig, 'data'> & { data?: K }>,
    baseOptions?: Options,
  ) =>
  (
    hookAxiosConfig?: Omit<AxiosRequestConfig, 'data'> & { data?: K },
    hookMutationOptions?: UseMutationOptions<T, ApiError, Omit<AxiosRequestConfig, 'data'> & { data?: K }>,
    hookOptions?: Options,
  ) => {
    return useMutation<
      T,
      ApiError,
      Omit<AxiosRequestConfig, 'data'> & {
        data?: K;
        setUrl?: (url: string) => string;
      }
    >(
      baseKey,
      async ({ setUrl, ...config }) => {
        try {
          const url = config.url ?? hookAxiosConfig?.url ?? baseAxiosConfig?.url ?? '';

          const { data } = await axiosInstance.request<T>({
            ...baseAxiosConfig,
            ...hookAxiosConfig,
            ...config,
            url: setUrl ? setUrl(url) : url,
          });

          return data;
        } catch (e) {
          const err = e as AxiosError<ApiError>;
          if (err?.isAxiosError) {
            if (process.env.NODE_ENV !== 'production') {
              const logFunc = one(hookOptions?.log, baseOptions?.log, log, defaultLogError);
              logFunc && logFunc(err);
            }

            const toastFunc = one(hookOptions?.toast, baseOptions?.toast, toast, defaultToastError);
            toastFunc && toastFunc(err);

            throw handleError(err);
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
      },
    );
  };
