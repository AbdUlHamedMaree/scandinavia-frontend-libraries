import { ApiError } from '../models/api-error';
import { ApiResult } from '../models/api-result';

export const isError = (result: ApiResult): result is ApiError =>
  !!(typeof (result as ApiError).errorType !== 'undefined'); // just mock
