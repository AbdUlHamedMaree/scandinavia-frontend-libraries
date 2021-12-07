import { ApiError } from './api-error';

export type ToastError = (error: ApiError) => void;
