import { FC, useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import useDataGridStore from "@/store/useDataGridStore";
import { SortOrder, TableHeaderCell } from "@/types/Common";

interface TableHeaderProps {
  headers: TableHeaderCell[];
}

const TableHeader: FC<TableHeaderProps> = ({ headers }) => {
  const { setOrder } = useDataGridStore();

  const sortIcon = useMemo(() => {
    return {
      [SortOrder.ASC]: (
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
      ),
      [SortOrder.DESC]: (
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
      ),
    };
  }, []);

  const handleHeaderOnClick = useCallback(
    (header: TableHeaderCell) => {
      if (!header.sortable) return;

      setOrder({
        field: header.key,
        direction:
          header.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC, // Toggle order
      });
    },
    [setOrder],
  );

  return (
    <thead className="bg-neutral-dark uppercase text-neutral-100">
      <tr>
        {headers.map((header) => (
          <th
            key={header.key}
            scope="col"
            className={twMerge(
              "px-6 py-3",
              header.sortable && "cursor-pointer",
            )}
            onClick={() => header.sortable && handleHeaderOnClick(header)}
            aria-sort={
              header.order
                ? header.order === SortOrder.ASC
                  ? "ascending"
                  : "descending"
                : "none"
            }
          >
            <div className="flex items-center">
              {header.label}
              {header.sortable && header.isDefault && (
                <span className="ml-1">
                  {sortIcon[header.order || SortOrder.ASC]}
                </span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
