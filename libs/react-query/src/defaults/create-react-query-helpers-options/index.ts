import axios from 'axios';
import { CreateReactQueryHelpersConfig } from '../../models';
import { defaultLogError } from '../handle-error';
import { defaultHandleError } from '../log-error';
import { defaultToastError } from '../toast-error';

export const defaultCreateReactQueryHelpersOptions: Required<CreateReactQueryHelpersConfig> = {
  axiosInstance: axios.create(),
  handleError: defaultHandleError,
  log: defaultLogError,
  toast: defaultToastError,
};
