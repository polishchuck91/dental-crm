import TableHeader from "@/components/table/TableHeader";
import TablePagination from "@/components/table/TablePagination";
import TableRow from "@/components/table/TableRow";
import useFetch from "@/hooks/useFetch";
import { ResponseData, SortOrder, TableHeaderCell } from "@/types/Common";
import { Treatment } from "@/types/Treatments";
import { FC, useMemo, useState } from "react";

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

const Treatments: FC = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: treatments } = useFetch<ResponseData<Treatment>>(
    `/treatments?page=${currentPage}`,
  );

  const totalPages = useMemo(
    () => (treatments ? Math.ceil(treatments.total / treatments.limit) : 1),
    [treatments],
  );

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
        currentPage={currentPage}
        totalPages={totalPages}
        perPage={treatments?.limit || 10}
        totalItems={treatments?.total || 0}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Treatments;
