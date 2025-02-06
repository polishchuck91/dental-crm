import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import useDataGridStore from "@/store/useDataGridStore";
import { SortOrder, TableHeaderCell } from "@/types/Common";

interface TableHeaderProps {
  headers: TableHeaderCell[];
}

const TableHeader: FC<TableHeaderProps> = ({ headers }) => {
  const [headerModel, setHeaderModel] = useState<TableHeaderCell[]>(headers);
  const [selectedHeader, setSelectedHeader] = useState(
    headerModel.find((header) => header.isDefault),
  );

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

      const newModel = [...headerModel];

      const index = newModel.findIndex((item) => item.key == header.key);

      setSelectedHeader(newModel[index]);

      newModel[index].order =
        newModel[index].order === SortOrder.ASC
          ? SortOrder.DESC
          : SortOrder.ASC;

      setHeaderModel(newModel);
    },
    [selectedHeader],
  );

  useEffect(() => {
    setOrder({
      field: selectedHeader?.key,
      direction: selectedHeader?.order,
    });
  }, [selectedHeader]);

  return (
    <>
      <pre>{JSON.stringify(selectedHeader, null, 2)}</pre>
      <thead className="bg-neutral-dark uppercase text-neutral-100">
        <tr>
          {headerModel.map((header) => (
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
                {header.key === selectedHeader?.key && (
                  <span className="ml-1">
                    {sortIcon[selectedHeader?.order || SortOrder.ASC]}
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;
