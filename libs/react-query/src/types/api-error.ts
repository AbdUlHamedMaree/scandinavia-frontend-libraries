import { ErrorTypeUnion } from './error-type-union';
import { AxiosError } from 'axios';

export type ApiError = { errorType: ErrorTypeUnion } & AxiosError;
