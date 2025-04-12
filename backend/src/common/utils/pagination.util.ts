import { SelectQueryBuilder } from 'typeorm';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export async function paginate<T>(
  query: SelectQueryBuilder<T>,
  page?: number,
  limit?: number,
  searchFields?: string[],
  q?: string,
  field: string = 'created_at',
  direction: 'ASC' | 'DESC' = 'ASC',
): Promise<PaginatedResult<T>> {
  const isPaginationDisabled =
    page === -1 || limit === -1 || page == null || limit == null;

  if (!isPaginationDisabled) {
    page = Math.max(1, page!);
    limit = Math.max(1, limit!);
  }

  if (q && searchFields?.length) {
    const searchConditions = searchFields
      .map((f) =>
        f.includes('.')
          ? `${f} LIKE :search`
          : `${query.alias}.${f} LIKE :search`,
      )
      .join(' OR ');
    query.andWhere(`(${searchConditions})`, { search: `%${q}%` });
  }

  if (field) {
    query.addOrderBy(`${query.alias}.${field}`, direction);
  }

  console.log('Generated SQL Query:', query.getSql());
  console.log('Query Parameters:', query.getQueryAndParameters());

  let data: T[];
  let total: number;

  if (isPaginationDisabled) {
    data = await query.getMany();
    total = data.length;
  } else {
    [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  }

  return {
    data,
    total,
    page: isPaginationDisabled ? 1 : page,
    limit: isPaginationDisabled ? total : limit,
  };
}
