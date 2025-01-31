import { FC, ReactNode, useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface TableRowProps {
  rowIndex: number;
  children: ReactNode;
}

const TableRow: FC<TableRowProps> = ({ rowIndex, children }): JSX.Element => {
  const rowStyles = useMemo(
    () =>
      twMerge(
        "border-b border-gray-200 hover:bg-gray-100",
        rowIndex % 2 === 0
          ? "bg-white dark:bg-gray-900"
          : "bg-gray-50 dark:bg-gray-800",
      ),
    [],
  );

  return <tr className={rowStyles}>{children}</tr>;
};

export default TableRow;
