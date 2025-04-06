import { ChangeEvent, FC, useCallback, useState, useEffect } from 'react';
import TableHeader from '@/components/table/TableHeader';
import TablePagination from '@/components/table/TablePagination';
import TableRow from '@/components/table/TableRow';
import TableSearchField from '@/components/table/TableSearchField';
import { useDataGrid } from '@/hooks/useDataGrid';
import useFetch from '@/hooks/useFetch';
import { useDebounce } from '@/hooks/useDebounce';
import { ResponseData, SortOrder, TableHeaderCell } from '@/types/Common';
import { Treatment } from '@/types/Treatments';
import { useBoolean } from '@/hooks/useBoolean';
import { AddOrEditTreatmentModal } from '../modals/AddOrEditTreatmentModal';
import appTheme from '@/theme';
import AddIcon from '../icons/AddIcon';
import Table from '../table/Table';
import TableBody from '../table/TableBody';
import TableCell from '../table/TableCell';
import { ConfirmDeleteModal } from '../modals/ConfirmDeleteModal';
import { deleteTreatment } from '@/api/endpoints/treatments';
import { enqueueSnackbar } from 'notistack';
import EditRowButton from '../buttons/EditRowButton';
import { NoResultsRow } from '../table/NoResultsRow';
import DeleteRowButton from '../buttons/DeleteRowButton';
import useSelectedRow from '@/hooks/useSelectedRow';
import TableToolbar from '../table/TableToolbar';
import OpenAddModalButton from '../buttons/OpenAddModalButton';

const headers: TableHeaderCell[] = [
  {
    key: 'treatment_name',
    label: 'Послуга',
    sortable: true,
    order: SortOrder.ASC,
    isDefault: true,
  },
  { key: 'description', label: 'Опис' },
  {
    key: 'cost',
    label: 'Вартість',
    sortable: true,
    order: SortOrder.ASC,
  },
  { key: 'cost_comment', label: 'Коментар' },
  { key: 'actions' },
];

const TreatmentsTable: FC = () => {
  const { value: openModal, toggle: toggleModal } = useBoolean();
  const { value: openConfirmDelete, toggle: toggleConfirmDelete } =
    useBoolean();

  const { selectedRow, selectRow, clearSelection } =
    useSelectedRow<Treatment>();

  const {
    page,
    pageSize,
    searchQuery,
    setSearchQuery,
    setPage,
    field,
    direction,
    setTotalItems,
    totalPages,
  } = useDataGrid();
  const debounceQuery = useDebounce(searchQuery, 300);

  const {
    data: treatments,
    isLoading,
    refetch: refetchTreatment,
  } = useFetch<ResponseData<Treatment>>('/treatments', {
    page,
    limit: pageSize,
    q: debounceQuery.length > 2 ? debounceQuery : undefined,
    field: field || 'treatment_name',
    direction: direction || SortOrder.ASC,
  });

  const handleOnQueryChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setSearchQuery(evt.target.value);
    },
    [setPage, setSearchQuery]
  );

  const handleOnEditClick = (treatment: Treatment) => {
    selectRow(treatment);
    toggleModal();
  };

  const handleOnDeleteOpen = (treatment: Treatment) => {
    selectRow(treatment);
    toggleConfirmDelete();
  };

  const handleOnDeleteClose = () => {
    toggleConfirmDelete();
    clearSelection();
  };

  const handleOnDelete = async () => {
    if (!selectedRow?.id) return;

    try {
      await deleteTreatment(selectedRow?.id);
      toggleConfirmDelete();
      clearSelection();
      refetchTreatment();
      enqueueSnackbar('Запис успішно видалено!', {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    toggleModal();
    clearSelection();
  };

  useEffect(() => {
    if (treatments?.total) {
      setTotalItems(treatments.total);
    }
  }, [treatments?.total, setTotalItems]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">Loading...</div>
    );
  }

  return (
    <div className="p-4">
      <div className="relative overflow-x-auto rounded-lg bg-white shadow-md dark:bg-gray-900">
        {/* Search Input */}
        <TableToolbar>
          <OpenAddModalButton onClick={toggleModal} />
          <TableSearchField
            autoFocus
            value={searchQuery}
            onChange={handleOnQueryChange}
          />
        </TableToolbar>
        {/* Table */}
        <Table>
          <TableHeader headers={headers} />
          <TableBody>
            {treatments?.data?.length ? (
              treatments.data.map((treatment, index) => (
                <TableRow key={treatment.id || index} rowIndex={index}>
                  <TableCell fontMedium textDark>
                    {treatment.treatment_name}
                  </TableCell>

                  <TableCell>{treatment.description || '—'}</TableCell>

                  <TableCell textDark>{`${treatment.cost} грн`}</TableCell>

                  <TableCell>{treatment.cost_comment || '—'}</TableCell>
                  <TableCell isActions>
                    <EditRowButton
                      item={treatment}
                      onEditClick={() => handleOnEditClick(treatment)}
                    />
                    <DeleteRowButton
                      item={treatment}
                      onDeleteOpen={() => handleOnDeleteOpen(treatment)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <NoResultsRow
                colSpan={headers.length}
                searchQuery={searchQuery}
              />
            )}
          </TableBody>
        </Table>

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
        onSuccess={() => refetchTreatment()}
        onClose={() => handleCloseModal()}
        treatment={selectedRow}
      />

      <ConfirmDeleteModal
        open={openConfirmDelete}
        onClose={() => handleOnDeleteClose()}
        onConfirm={() => handleOnDelete()}
      />
    </div>
  );
};

export default TreatmentsTable;
