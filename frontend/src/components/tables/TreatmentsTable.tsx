import { ChangeEvent, FC, useMemo, useCallback, useState } from "react";
import TableHeader from "@/components/table/TableHeader";
import TablePagination from "@/components/table/TablePagination";
import TableRow from "@/components/table/TableRow";
import TableSearchField from "@/components/table/TableSearchField";
import { useDataGrid } from "@/hooks/useDataGrid";
import useFetch from "@/hooks/useFetch";
import { useDebounce } from "@/hooks/useDebounce";
import { ResponseData, SortOrder, TableHeaderCell } from "@/types/Common";
import { Treatment } from "@/types/Treatments";
import { useBoolean } from "@/hooks/useBoolean";
import { AddOrEditTreatmentModal } from "../modals/AddOrEditTreatmentModal";
import appTheme from "@/theme";
import AddIcon from "../icons/AddIcon";

const headers: TableHeaderCell[] = [
  {
    key: "treatment_name",
    label: "Послуга",
    sortable: true,
    order: SortOrder.ASC,
    isDefault: true,
  },
  { key: "description", label: "Опис" },
  {
    key: "cost",
    label: "Вартість",
    sortable: true,
    order: SortOrder.ASC,
  },
  { key: "cost_comment", label: "Коментар" },
  { key: "actions", label: null },
];

const TreatmentsTable: FC = () => {
  const { value: openModal, toggle: toggleModal } = useBoolean();

  const [selectedTreatment, setSelectedTreatment] = useState<
    Treatment | undefined
  >(undefined);

  const {
    page,
    pageSize,
    searchQuery,
    setSearchQuery,
    setPage,
    field,
    direction,
  } = useDataGrid();
  const debounceQuery = useDebounce(searchQuery, 300);

  const { data: treatments, isLoading } = useFetch<ResponseData<Treatment>>(
    "/treatments",
    {
      page,
      limit: pageSize,
      q: debounceQuery.length > 2 ? debounceQuery : undefined,
      field: field || "treatment_name",
      direction: direction || SortOrder.ASC,
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

  const handleOnEditClick = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    toggleModal();
  };

  const handleCloseModal = () => {
    toggleModal();
    setSelectedTreatment(undefined);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">Loading...</div>
    );
  }

  return (
    <div className="p-4">
      <div className="relative overflow-x-auto rounded-lg bg-white shadow-md dark:bg-gray-900">
        {/* Search Input */}
        <div className="flex w-full flex-row justify-between p-4">
          <button
            type="button"
            className={appTheme.button.primary.outline}
            onClick={toggleModal}
          >
            <AddIcon />
            <span className="ml-2"> Додати</span>
          </button>
          <TableSearchField
            autoFocus
            value={searchQuery}
            onChange={handleOnQueryChange}
          />
        </div>

        {/* Table */}
        <table className="w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
          <TableHeader headers={headers} />
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
                  <td>
                    <button
                      className={appTheme.button.circle}
                      onClick={() => handleOnEditClick(treatment)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </TableRow>
              ))
            ) : (
              <TableRow rowIndex={0}>
                <td className="px-6 py-4 text-center" colSpan={headers.length}>
                  {"Результати для "}
                  <strong>{searchQuery}</strong>
                  {" не знайдені"}
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

      <AddOrEditTreatmentModal
        open={openModal}
        onClose={() => handleCloseModal()}
        treatment={selectedTreatment}
      />
    </div>
  );
};

export default TreatmentsTable;
