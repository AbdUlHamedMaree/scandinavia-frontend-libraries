import { LogError } from './log-error';
import { ToastError } from './toast-error';

export type Options = {
  toast?: boolean | ToastError;
  log?: boolean | LogError;
};

export type OptionsFuncs = {
  toast?: ToastError;
  log?: LogError;
};
