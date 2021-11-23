export type ApiResponseSuccess<T = any> = {
  data: T;
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
