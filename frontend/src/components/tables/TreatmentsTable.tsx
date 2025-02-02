import { ChangeEvent, FC, useMemo, useCallback } from "react";
import TableHeader from "@/components/table/TableHeader";
import TablePagination from "@/components/table/TablePagination";
import TableRow from "@/components/table/TableRow";
import TableSearchField from "@/components/table/TableSearchField";
import { useDataGrid } from "@/hooks/useDataGrid";
import useFetch from "@/hooks/useFetch";
import { useDebounce } from "@/hooks/useDebounce";
import { ResponseData, SortOrder, TableHeaderCell } from "@/types/Common";
import { Treatment } from "@/types/Treatments";

const headers: TableHeaderCell[] = [
  {
    key: "treatment_name",
    label: "Послуга",
    sortable: true,
    order: SortOrder.ASC,
  },
  { key: "description", label: "Опис" },
  { key: "cost", label: "Вартість", sortable: true, order: SortOrder.ASC },
  { key: "cost_comment", label: "Коментар" },
];

const TreatmentsTable: FC = () => {
  const { page, pageSize, searchQuery, setSearchQuery, setPage } =
    useDataGrid();
  const debounceQuery = useDebounce(searchQuery, 300);

  const { data: treatments, isLoading } = useFetch<ResponseData<Treatment>>(
    "/treatments",
    {
      page,
      limit: pageSize,
      q: debounceQuery.length > 2 ? debounceQuery : undefined,
    },
  );

  const totalPages = useMemo(() => {
    return treatments?.total && treatments?.limit
      ? Math.ceil(treatments.total / treatments.limit)
      : 1;
  }, [treatments]);

  const handleOnQueryChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setSearchQuery(evt.target.value);
    },
    [setPage, setSearchQuery],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">Loading...</div>
    );
  }

  return (
    <div className="relative overflow-x-auto rounded-lg bg-white shadow-md dark:bg-gray-900">
      {/* Search Input */}
      <div className="p-4">
        <TableSearchField
          autoFocus
          value={searchQuery}
          onChange={handleOnQueryChange}
        />
      </div>

      {/* Table */}
      <table className="w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
        <TableHeader header={headers} />
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {treatments?.data?.length ? (
            treatments.data.map((treatment, index) => (
              <TableRow key={treatment.id || index} rowIndex={index}>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {treatment.treatment_name}
                </td>
                <td className="px-6 py-4">{treatment.description || "—"}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {`${treatment.cost} грн`}
                </td>
                <td className="px-6 py-4">{treatment.cost_comment || "—"}</td>
              </TableRow>
            ))
          ) : (
            <TableRow rowIndex={0}>
              <td className="px-6 py-4 text-center" colSpan={headers.length}>
                {`Результати для "${searchQuery}" не знайдені`}
              </td>
            </TableRow>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <TablePagination
        currentPage={page}
        totalPages={totalPages}
        perPage={treatments?.limit ?? pageSize}
        totalItems={treatments?.total ?? 0}
      />
    </div>
  );
};

export default TreatmentsTable;
