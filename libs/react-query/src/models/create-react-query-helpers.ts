import { AxiosInstance } from 'axios';

import { createMutation as cm } from '../lib/create-mutation';
import { createQuery as cq } from '../create-query';
import { HandlerError } from './handle-error';
import { Options } from './options';

export type CreateReactQueryHelpersConfig = {
  axiosInstance?: AxiosInstance;
  handleError?: HandlerError;
} & Options;

export type CreateReactQueryHelpers = (config: CreateReactQueryHelpersConfig) => {
  createMutation: ReturnType<typeof cm>;
  createQuery: ReturnType<typeof cq>;
};
