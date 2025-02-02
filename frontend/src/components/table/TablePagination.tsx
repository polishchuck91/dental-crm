import { useDataGrid } from "@/hooks/useDataGrid";
import React from "react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalItems: number;
}

const pageSizes = [5, 10, 20, 50];

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  perPage,
  totalItems,
}) => {
  const { setPage, setPageSize, pageSize } = useDataGrid();

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white px-4 py-3 shadow-md dark:bg-gray-800">
      {/* Page Size Selector */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="page-size"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Кількість на сторінці:
        </label>
        <select
          id="page-size"
          className="rounded-md border border-neutral-300 bg-gray-50 px-2 py-1 text-sm text-gray-900 focus:border-neutral focus:ring-neutral"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-row content-center items-center gap-3">
        {/* Pagination Info */}
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Від{" "}
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
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-2">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            aria-label="Previous Page"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg
              className="h-4 w-4"
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

          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {currentPage} з {totalPages}
          </span>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            aria-label="Next Page"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg
              className="h-4 w-4"
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
    </div>
  );
};

export default TablePagination;
