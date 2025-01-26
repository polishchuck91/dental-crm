import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
}

const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}));

export default useLoadingStore;
