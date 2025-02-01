import { SortOrder, TableHeaderCell } from "@/types/Common";
import { FC, useCallback } from "react";
import { twMerge } from "tailwind-merge";

interface TableHeaderProps {
  header: TableHeaderCell[];
}

const TableHeader: FC<TableHeaderProps> = ({ header }) => {
  const sortIcon = useCallback((direction?: SortOrder) => {
    return direction ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="size-5"
      >
        <path
          fillRule="evenodd"
          d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="size-5"
      >
        <path
          fillRule="evenodd"
          d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z"
          clipRule="evenodd"
        />
      </svg>
    );
  }, []);

  return (
    <thead className="text bg-neutral-dark uppercase text-neutral-100">
      <tr>
        {header.map((header) => (
          <th key={header.key} scope="col" className="px-6 py-3">
            <div
              className={twMerge(
                "flex items-center",
                header.sortable && "cursor-pointer",
              )}
            >
              {header.label}
              {header.sortable && (
                <div className="ml-1">{sortIcon(header.order)}</div>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
