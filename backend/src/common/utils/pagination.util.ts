// src/common/utils/pagination.util.ts
import { SelectQueryBuilder } from 'typeorm';

export interface OrderBy {
  field: string;
  direction: 'ASC' | 'DESC';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export async function paginate<T>(
  query: SelectQueryBuilder<T>,
  page: number = 1,
  limit: number = 10,
  searchFields?: string[],
  search?: string,
  orderBy?: OrderBy[], // Array of fields and directions
): Promise<PaginatedResult<T>> {
  if (search && searchFields?.length) {
    const searchConditions = searchFields
      .map((field) => `${field} LIKE :search`)
      .join(' OR '); // Combine conditions with OR

    query.andWhere(`(${searchConditions})`, { search: `%${search}%` });
  }

  if (orderBy?.length) {
    for (const { field, direction } of orderBy) {
      query.addOrderBy(field, direction);
    }
  }

  const [data, total] = await query
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  return {
    data,
    total,
    page,
    limit,
  };
}
