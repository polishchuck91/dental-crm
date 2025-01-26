// useLoadingStore.ts
export interface LoadingState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const createLoadingSlice = (
  set: (state: Partial<LoadingState>) => void,
): LoadingState => ({
  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),
});

export default createLoadingSlice;
