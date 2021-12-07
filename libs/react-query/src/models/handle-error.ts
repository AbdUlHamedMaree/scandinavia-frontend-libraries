import { ApiError } from './api-error';

export type HandlerError = (error: ApiError) => unknown;
