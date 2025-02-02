import { FC, forwardRef, InputHTMLAttributes } from "react";

interface TableSearchFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

const TableSearchField: FC<TableSearchFieldProps> = forwardRef<
  HTMLInputElement,
  TableSearchFieldProps
>(({ className, ...props }, ref) => {
  return (
    <div className="flex justify-end px-4 py-3">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full max-w-sm">
        {/* Search Icon */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        {/* Search Input */}
        <input
          ref={ref}
          type="text"
          id="table-search"
          className={`block w-full rounded-md border border-neutral-300 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 focus:border-neutral focus:ring-neutral-dark ${className || ""}`}
          placeholder="Шукати..."
          {...props}
        />
      </div>
    </div>
  );
});

TableSearchField.displayName = "TableSearchField";

export default TableSearchField;
