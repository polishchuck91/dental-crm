import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import useFetch from "@/hooks/useFetch";
import { ResponseData, SortOrder, TableHeaderCell } from "@/types/Common";
import { Treatment } from "@/types/Treatments";
import { FC } from "react";

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
  const { data: treatments } = useFetch<ResponseData<Treatment>>("/treatments");

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-gray-700 shadow-md">
        <TableHeader header={headers} />
        <tbody>
          {treatments?.data.map((treatment, index) => (
            <TableRow rowIndex={index}>
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
    </div>
  );
};

export default Treatments;
