import { DataGridContext } from "@/providers/DataGridProvider";
import { useContext } from "react";

export const useDataGrid = () => {
  const context = useContext(DataGridContext);
  if (!context) {
    throw new Error("useDataGrid must be used within a DataGridProvider");
  }
  return context;
};
