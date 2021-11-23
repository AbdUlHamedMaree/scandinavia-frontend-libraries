import { createMutation as cm } from './create-mutation';
import { createQuery as cq } from './create-query';
import { CreateReactQueryHelpers } from '../models';
import { defaultCreateReactQueryHelpersOptions } from '../defaults';

export const createReactQueryHelpers: CreateReactQueryHelpers = baseConfig => {
  const config = { ...defaultCreateReactQueryHelpersOptions, ...baseConfig };

  return {
    createQuery: cq(config),
    createMutation: cm(config),
  };
};
