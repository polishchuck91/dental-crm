import React from "react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  perPage,
  totalItems,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  return (
    <div className="flex flex-row items-center justify-between p-3">
      {/* Help text */}
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Відобразити{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {startItem}
        </span>{" "}
        до{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {endItem}
        </span>{" "}
        з{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalItems}
        </span>
      </span>

      {/* Pagination Buttons */}
      <div className="inline-flex">
        <button
          className="flex h-8 items-center justify-center rounded-s bg-neutral-dark px-3 text-sm font-medium text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous Page"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg
            className="h-3.5 w-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
        </button>

        <button
          className="flex h-8 items-center justify-center rounded-e border-0 border-s bg-neutral-dark px-3 text-sm font-medium text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next Page"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <svg
            className="h-3.5 w-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
