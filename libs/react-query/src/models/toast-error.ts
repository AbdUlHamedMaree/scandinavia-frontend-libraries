import { AxiosError } from 'axios';
import { ApiError } from './api';

export type ToastError = (error: AxiosError<ApiError>) => void;
