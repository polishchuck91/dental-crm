import { SortOrder } from "@/types/Common";
import { create } from "zustand";

export interface DataGridState {
  page: number;
  pageSize: number;
  searchQuery: string;
  totalItems: number;
  field: string;
  direction: SortOrder;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearchQuery: (query: string) => void;
  setTotalItems: (total: number) => void;
  setOrder: (field: string, direction: SortOrder) => void; // Метод для оновлення field і direction
}

const useDataGridStore = create<DataGridState>((set) => ({
  page: 1,
  pageSize: 10,
  searchQuery: "",
  totalItems: 0,
  field: "", // Додано поле сортування за замовчуванням
  direction: SortOrder.ASC, // Додано напрямок сортування за замовчуванням
  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setTotalItems: (total) => set({ totalItems: total }),
  setOrder: (field, direction) => set({ field, direction }), // Правильне оновлення стану
}));

export default useDataGridStore;
