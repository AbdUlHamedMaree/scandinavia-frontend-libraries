import { AxiosError } from 'axios';
import { ApiError } from './api';

export type HandlerError = (error: AxiosError<ApiError>) => unknown;
