import { useState } from 'react';

function useSelectedRow<T>() {
  const [selectedRow, setSelectedRow] = useState<T | undefined>(undefined);

  const selectRow = (row: T) => {
    setSelectedRow(row);
  };

  const clearSelection = () => {
    setSelectedRow(undefined);
  };

  return {
    selectedRow,
    selectRow,
    clearSelection,
  };
}

export default useSelectedRow;
