import { SortOrder } from '@/types/Common';
import { create } from 'zustand';

export interface DataGridState {
  page: number;
  pageSize: number;
  searchQuery: string;
  totalItems: number;
  totalPages: number;
  field: string;
  direction: SortOrder;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearchQuery: (query: string) => void;
  setTotalItems: (total: number) => void;
  setOrder: (field: string, direction: SortOrder) => void;
}

const useDataGridStore = create<DataGridState>((set, get) => ({
  page: 1,
  pageSize: 10,
  searchQuery: '',
  totalItems: 0,
  totalPages: 1,
  field: '',
  direction: SortOrder.ASC,

  setPage: (page) => set({ page }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setOrder: (field, direction) => set({ field, direction }),

  setTotalItems: (total) => {
    const pageSize = get().pageSize;
    const totalPages = pageSize ? Math.ceil(total / pageSize) : 1;
    set({ totalItems: total, totalPages });
  },

  setPageSize: (size) => {
    const totalItems = get().totalItems;
    const totalPages = size ? Math.ceil(totalItems / size) : 1;
    set({ pageSize: size, totalPages });
  },
}));

export default useDataGridStore;
