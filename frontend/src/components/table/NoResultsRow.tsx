import React from 'react';
import TableRow from './TableRow';

interface NoResultsRowProps {
  searchQuery: string;
  colSpan: number;
}

export const NoResultsRow: React.FC<NoResultsRowProps> = ({
  searchQuery,
  colSpan,
}) => {
  return (
    <TableRow rowIndex={0}>
      <td className="px-6 py-4 text-center" colSpan={colSpan}>
        {'Результати для '}
        <strong>{searchQuery}</strong>
        {' не знайдені'}
      </td>
    </TableRow>
  );
};
