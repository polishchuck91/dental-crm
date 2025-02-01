import { create } from "zustand";

export interface DataGridState {
  page: number;
  pageSize: number;
  searchQuery: string;
  totalItems: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearchQuery: (query: string) => void;
  setTotalItems: (total: number) => void;
}

const useDataGridStore = create<DataGridState>((set) => ({
  page: 1,
  pageSize: 10,
  searchQuery: "",
  totalItems: 0,
  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setTotalItems: (total) => set({ totalItems: total }),
}));

export default useDataGridStore;
