export interface ResponseData<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface Timestamp {
  created_at: string;
  updated_at: string;
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface TableHeaderCell {
  key: string;
  label?: string;
  sortable?: boolean;
  order?: SortOrder;
  isDefault?: boolean;
}
