import { ApiError } from './api-error';

export type LogError = (error: ApiError) => void;
