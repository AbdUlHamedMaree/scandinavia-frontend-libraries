import { AxiosError } from 'axios';
import { ApiError } from './api';

export type LogError = (error: AxiosError<ApiError>) => void;
