import { create } from "zustand";

export interface DataGridState {
  page: number;
  pageSize: number;
  searchQuery: string;
  totalItems: number;
  order: Record<string, string>; // Коректний запис масиву об'єктів
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearchQuery: (query: string) => void;
  setTotalItems: (total: number) => void;
  setOrder: (order: Record<string, any>) => void; // Метод для оновлення order
}

const useDataGridStore = create<DataGridState>((set) => ({
  page: 1,
  pageSize: 10,
  searchQuery: "",
  totalItems: 0,
  order: {},
  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setTotalItems: (total) => set({ totalItems: total }),
  setOrder: (order) => set({ order }), // Функція для оновлення order
}));

export default useDataGridStore;
