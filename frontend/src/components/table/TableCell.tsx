import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  fontMedium?: boolean;
  textDark?: boolean;
  isActions?: boolean;
}

const TableCell: React.FC<TableCellProps> = ({
  children,
  className = '',
  fontMedium,
  textDark,
  isActions,
}) => {
  const conditionalClasses = [
    fontMedium ? 'font-medium' : '',
    textDark ? 'text-gray-900' : '',
    isActions ? 'flex flex-row gap-1' : '',
  ].join(' ');

  return (
    <td className={twMerge('px-6 py-4', conditionalClasses, className)}>
      {children}
    </td>
  );
};

export default TableCell;
