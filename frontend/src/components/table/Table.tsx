import { FC, ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

const Table: FC<TableProps> = ({ children }) => {
  return (
    <table className="w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
      {children}
    </table>
  );
};

export default Table;
