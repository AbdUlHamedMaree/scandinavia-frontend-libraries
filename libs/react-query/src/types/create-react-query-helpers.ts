import { AxiosInstance, AxiosStatic } from 'axios';

import { createMutation as cm } from '../lib/create-mutation';
import { createQuery as cq } from '../lib/create-query';
import { HandlerError } from './handle-error';
import { Options } from './options';

export type CreateReactQueryHelpersConfig = {
  axiosInstance?: AxiosInstance | AxiosStatic;
  handleError?: HandlerError;
} & Options;

export type CreateReactQueryHelpers = (config?: CreateReactQueryHelpersConfig) => {
  createMutation: ReturnType<typeof cm>;
  createQuery: ReturnType<typeof cq>;
};
