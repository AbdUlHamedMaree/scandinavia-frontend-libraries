import { ApiRequestError } from './api-request-error';
import { ApiResponseError } from './api-response-error';
import { ApiUnknownError } from './api-unknown-error';

export type ApiError = ApiResponseError | ApiRequestError | ApiUnknownError;
