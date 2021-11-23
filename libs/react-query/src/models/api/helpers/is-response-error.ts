import { ApiError } from '../models/api-error';
import { ApiResponseError } from '../models/api-response-error';

export const isResponseError = (result: ApiError): result is ApiResponseError =>
  !!(typeof (result as ApiResponseError).statusCode !== 'undefined'); // just mock
