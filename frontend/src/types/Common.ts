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
