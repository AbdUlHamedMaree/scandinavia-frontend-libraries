import { ApiErrorEnum } from '../enums';

export type ApiResponseError = {
  errorType: ApiErrorEnum.response;
  error: string;
  message: string[];
  statusCode: number;
};
