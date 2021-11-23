import { AxiosRequestConfig } from 'axios';
import { ApiError } from './api';
import { RequestStatus } from './request-status';

export type Return<T> = [(config?: AxiosRequestConfig) => Promise<ApiError | T>, T | undefined, RequestStatus];
