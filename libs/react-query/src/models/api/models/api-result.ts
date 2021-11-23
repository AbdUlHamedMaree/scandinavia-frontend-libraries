import { ApiError } from './api-error';
import { ApiResponseSuccess } from './api-response-success';

export type ApiResult<T = unknown> = ApiError | ApiResponseSuccess<T>;
