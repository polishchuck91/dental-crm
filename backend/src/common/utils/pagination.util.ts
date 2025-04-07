import { SelectQueryBuilder } from 'typeorm';

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
  q?: string,
  field: string = 'created_at',
  direction: 'ASC' | 'DESC' = 'ASC',
): Promise<PaginatedResult<T>> {
  // Ensure valid page and limit values
  page = Math.max(1, page);
  limit = Math.max(1, limit);

  // Handle search functionality
  if (q && searchFields?.length) {
    const searchConditions = searchFields
      .map((f) => {
        // Якщо поле вже має alias (тобто містить крапку), використовуємо як є
        return f.includes('.')
          ? `${f} LIKE :search`
          : `${query.alias}.${f} LIKE :search`;
      })
      .join(' OR ');

    query.andWhere(`(${searchConditions})`, { search: `%${q}%` });
  }

  if (field) {
    query.addOrderBy(`${query.alias}.${field}`, direction);
  }

  // Debugging: Log generated SQL query
  console.log('Generated SQL Query:', query.getSql());
  console.log('Query Parameters:', query.getQueryAndParameters());

  // Execute query and retrieve paginated results
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
