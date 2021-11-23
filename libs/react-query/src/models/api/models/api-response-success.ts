export type ApiResponseSuccess<T = unknown> = {
  data: T;
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
