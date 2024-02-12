export default interface PaginationResult<T> {
  data: T[];
  totalPages: number;
  currentPage: number;
  perPage: number;
  totalCount: number;
  hasMore: boolean;
}
