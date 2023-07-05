type Pagination = {
    limit: number,
    size: number,
    skip: number,
    total: number
}

type PaginationData<Type> = {
    records: Type[];
    pagination: Pagination
}

type PaginationParams = {
    pageIndex: number,
    pageSize: number,
    sortField: string;
    sortOrder: 'asc' | 'desc';
    search?: string,
    filters?: Record<string, (string|number)[]>
}
