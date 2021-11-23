import { AxiosError, AxiosRequestConfig } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { defaultLogError, defaultToastError } from '../defaults';
import { CreateReactQueryHelpersConfig, Options, ApiError } from '../models';
import { one } from '../utils';
import { AnyObject, QueryKey } from '../types';

export const createQuery =
  ({
    handleError,
    log,
    toast,
    axiosInstance,
  }: Required<CreateReactQueryHelpersConfig>) =>
  <T extends AnyObject = AnyObject>(
    baseKey: QueryKey,
    baseAxiosConfig?: AxiosRequestConfig,
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
          const { data } = await axiosInstance.request<T>({
            ...baseAxiosConfig,
            ...hookAxiosConfig,
          });

          return data;
        } catch (e) {
          const err = e as AxiosError<ApiError>;
          if (err?.isAxiosError) {
            if (process.env.NODE_ENV !== 'production') {
              const logFunc = one(
                hookOptions?.log,
                baseOptions?.log,
                log,
                defaultLogError
              );
              logFunc && logFunc(err);
            }

            const toastFunc = one(
              hookOptions?.toast,
              baseOptions?.toast,
              toast,
              defaultToastError
            );
            toastFunc && toastFunc(err);

            throw handleError(err);
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
