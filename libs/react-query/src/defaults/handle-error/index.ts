import { HandlerError } from '../../models/handle-error';

export const defaultHandleError: HandlerError = error => {
  return error;
};
