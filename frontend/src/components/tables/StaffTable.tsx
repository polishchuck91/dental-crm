import { useDataGrid } from '@/hooks/useDataGrid';
import { useDebounce } from '@/hooks/useDebounce';
import useFetch from '@/hooks/useFetch';
import { ResponseData, SortOrder, TableHeaderCell } from '@/types/Common';
import { Staff } from '@/types/Staff';
import Table from '../table/Table';
import TableHeader from '../table/TableHeader';
import TableBody from '../table/TableBody';
import TableRow from '../table/TableRow';
import TableCell from '../table/TableCell';
import { NoResultsRow } from '../table/NoResultsRow';
import { useBoolean } from '@/hooks/useBoolean';
import EditRowButton from '../buttons/EditRowButton';
import useSelectedRow from '@/hooks/useSelectedRow';
import { enqueueSnackbar } from 'notistack';
import { ConfirmDeleteModal } from '../modals/ConfirmDeleteModal';
import DeleteRowButton from '../buttons/DeleteRowButton';
import OpenAddModalButton from '../buttons/OpenAddModalButton';
import TableSearchField from '../table/TableSearchField';
import { ChangeEvent, useCallback } from 'react';
import { AddOrEditUserModal } from '../modals/AddOrEditUserModal';

const headers: TableHeaderCell[] = [
  {
    key: 'last_name',
    label: 'Прізвище',
    sortable: true,
    order: SortOrder.ASC,
    isDefault: true,
  },
  {
    key: 'first_name',
    label: 'Імя',
  },
  {
    key: 'contact_number',
    label: 'Телефон',
  },
  {
    key: 'user.email',
    label: 'Email',
  },
  {
    key: 'hire_date',
    label: 'Дата оформлення',
  },

  { key: 'actions' },
];

const StaffTable = () => {
  const { value: openModal, toggle: toggleModal } = useBoolean();
  const { value: openConfirmDelete, toggle: toggleConfirmDelete } =
    useBoolean();

  const { selectedRow, selectRow, clearSelection } = useSelectedRow<Staff>();

  const {
    page,
    pageSize,
    searchQuery,
    field,
    direction,
    setPage,
    setSearchQuery,
  } = useDataGrid();
  const debounceQuery = useDebounce(searchQuery, 300);

  const { data: staff, refetch } = useFetch<ResponseData<Staff>>('/staff', {
    page,
    limit: pageSize,
    q: debounceQuery.length > 2 ? debounceQuery : undefined,
    field: field || 'last_name',
    direction: direction || SortOrder.ASC,
  });

  const handleOnQueryChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setSearchQuery(evt.target.value);
    },
    [setPage, setSearchQuery]
  );

  const handleOnEditClick = (item: Staff) => {
    selectRow(item);
    toggleModal();
  };

  const handleCloseModal = () => {
    refetch();
    toggleModal();
    clearSelection();
  };

  const handleOnDeleteOpen = (staff: Staff) => {
    selectRow(staff);
    toggleConfirmDelete();
  };

  const handleOnDeleteClose = () => {
    refetch();
    toggleConfirmDelete();
    clearSelection();
  };

  const handleOnDelete = async () => {
    if (!selectedRow?.id) return;

    try {
      enqueueSnackbar('Запис успішно видалено!', {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <div className="relative overflow-x-auto rounded-lg bg-white shadow-md dark:bg-gray-900">
        <div className="flex w-full flex-row justify-between p-4">
          <OpenAddModalButton onClick={toggleModal} />
          <TableSearchField
            autoFocus
            value={searchQuery}
            onChange={handleOnQueryChange}
          />
        </div>

        <Table>
          <TableHeader headers={headers} />
          <TableBody>
            {staff?.data.length ? (
              staff.data.map((item, index) => (
                <TableRow key={item.id} rowIndex={index}>
                  <TableCell fontMedium textDark>
                    {item['last_name']}
                  </TableCell>
                  <TableCell fontMedium textDark>
                    {item['first_name']}
                  </TableCell>
                  <TableCell>{item['contact_number']}</TableCell>
                  <TableCell>{item.user.email}</TableCell>
                  <TableCell>
                    {new Date(item.hire_date).toLocaleDateString('uk-UA')}
                  </TableCell>
                  <TableCell isActions>
                    <EditRowButton
                      item={item}
                      onEditClick={() => handleOnEditClick(item)}
                    />
                    <DeleteRowButton
                      item={staff}
                      onDeleteOpen={() => handleOnDeleteOpen(item)}
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
      </div>

      <AddOrEditUserModal
        mode="staff"
        open={openModal}
        staff={selectedRow}
        onClose={() => handleCloseModal()}
      />

      <ConfirmDeleteModal
        open={openConfirmDelete}
        onClose={() => handleOnDeleteClose()}
        onConfirm={() => handleOnDelete()}
      />
    </div>
  );
};

export default StaffTable;
