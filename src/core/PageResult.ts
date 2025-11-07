export interface PageResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export function PAGE_RESULT_VAZIO<T>(): PageResult<T> {
  return {
    items: [],
    page: 1,
    pageSize: 5,
    total: 5
  };
}
