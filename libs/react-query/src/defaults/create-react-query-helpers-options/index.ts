import axios from 'axios';
import { CreateReactQueryHelpersConfig } from '../../types';
import { defaultHandleError } from '../handle-error';
import { defaultLogError } from '../log-error';
import { defaultToastError } from '../toast-error';

export const defaultCreateReactQueryHelpersOptions: Required<CreateReactQueryHelpersConfig> = {
  axiosInstance: axios.create(),
  handleError: defaultHandleError,
  log: defaultLogError,
  toast: defaultToastError,
};
