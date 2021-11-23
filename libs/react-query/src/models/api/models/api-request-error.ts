import { ApiErrorEnum } from '../enums';

export type ApiRequestError = {
  errorType: ApiErrorEnum.request;
  request: unknown;
};
