import { HandlerError } from '../../types/handle-error';

export const defaultHandleError: HandlerError = error => {
  return error;
};
