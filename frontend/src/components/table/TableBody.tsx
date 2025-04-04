import { FC, ReactNode } from 'react';

interface TableBodyProps {
  children: ReactNode;
}

const TableBody: FC<TableBodyProps> = ({ children }) => {
  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </tbody>
  );
};

export default TableBody;
