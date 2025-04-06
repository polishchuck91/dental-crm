import { FC, ReactNode } from 'react';

interface TableToolbarProps {
  children: ReactNode;
}

const TableToolbar: FC<TableToolbarProps> = ({ children }) => {
  return (
    <div className="flex w-full flex-row justify-between p-4">{children}</div>
  );
};

export default TableToolbar;
