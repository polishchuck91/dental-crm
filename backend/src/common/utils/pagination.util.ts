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
  q?: string,
  orderBy?: OrderBy, // Array of fields and directions
): Promise<PaginatedResult<T>> {
  // Ensure valid page and limit values
  page = Math.max(1, page);
  limit = Math.max(1, limit);

  // Handle search functionality
  if (q && searchFields?.length) {
    const searchConditions = searchFields
      .map((field) => `${query.alias}.${field} LIKE :search`)
      .join(' OR ');

    query.andWhere(`(${searchConditions})`, { search: `%${q}%` });
  }

  query.addOrderBy(orderBy.field, orderBy.direction);

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
