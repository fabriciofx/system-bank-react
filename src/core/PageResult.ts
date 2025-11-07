export interface PageResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export function EMPTY_PAGE_RESULT<T>(): PageResult<T> {
  return {
    items: [],
    page: 1,
    pageSize: 5,
    total: 5
  };
}
