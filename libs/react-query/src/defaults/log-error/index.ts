import { ApiErrorEnum } from '../../models/api';
import { HandlerError } from '../../models/handle-error';

export const defaultHandleError: HandlerError = error => {
  let toThrow = {};
  if (error.response)
    toThrow = {
      ...error.response.data,
      errorType: ApiErrorEnum.response,
    };
  else if (error.request)
    toThrow = {
      request: error.request,
      errorType: ApiErrorEnum.request,
    };
  else toThrow = { ...error, errorType: ApiErrorEnum.unknown };
  return toThrow;
};
