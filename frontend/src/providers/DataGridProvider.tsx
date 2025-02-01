import useDataGridStore, { DataGridState } from "@/store/useDataGridStore";
import { createContext, FC, ReactNode } from "react";

interface DataGridProviderProps {
  children: ReactNode;
}

export const DataGridContext = createContext<DataGridState | null>(null);

export const DataGridProvider: FC<DataGridProviderProps> = ({ children }) => {
  const state = useDataGridStore();

  return (
    <DataGridContext.Provider value={state}>
      {children}
    </DataGridContext.Provider>
  );
};
