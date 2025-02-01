import TableHeader from "@/components/table/TableHeader";
import TablePagination from "@/components/table/TablePagination";
import TableRow from "@/components/table/TableRow";
import { useDataGrid } from "@/hooks/useDataGrid";
import useFetch from "@/hooks/useFetch";
import { ResponseData, SortOrder, TableHeaderCell } from "@/types/Common";
import { Treatment } from "@/types/Treatments";
import { FC, useMemo } from "react";

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

const TreatmentsTable: FC = (): JSX.Element => {
  const { page, pageSize } = useDataGrid();

  const { data: treatments, isLoading } = useFetch<ResponseData<Treatment>>(
    "/treatments",
    { page, limit: pageSize },
  );

  const totalPages = useMemo(
    () => (treatments ? Math.ceil(treatments.total / treatments.limit) : 1),
    [treatments],
  );

  if (isLoading) {
    return <>...</>;
  }

  return (
    <div className="relative overflow-x-auto rounded-lg shadow-md">
      <table className="w-full text-left text-gray-700">
        <TableHeader header={headers} />
        <tbody>
          {treatments?.data.map((treatment, index) => (
            <TableRow key={treatment.id || index} rowIndex={index}>
              <th className="px-6 py-4 uppercase">
                {treatment.treatment_name}
              </th>
              <td className="px-6 py-4">{treatment.description}</td>
              <th className="px-6 py-4">{treatment.cost}</th>
              <td className="px-6 py-4">{treatment.cost_comment}</td>
            </TableRow>
          ))}
        </tbody>
      </table>
      <TablePagination
        currentPage={page}
        totalPages={totalPages}
        perPage={treatments?.limit || 10}
        totalItems={treatments?.total || 0}
      />
    </div>
  );
};

export default TreatmentsTable;
