import { useDataGrid } from '@/hooks/useDataGrid';
import { useDebounce } from '@/hooks/useDebounce';
import useFetch from '@/hooks/useFetch';
import { ResponseData, SortOrder, TableHeaderCell } from '@/types/Common';
import Table from '../table/Table';
import TableHeader from '../table/TableHeader';
import TableBody from '../table/TableBody';
import TableRow from '../table/TableRow';
import TableCell from '../table/TableCell';
import TableSearchField from '../table/TableSearchField';
import { ChangeEvent, useCallback } from 'react';
import OpenAddModalButton from '../buttons/OpenAddModalButton';
import { useBoolean } from '@/hooks/useBoolean';
import useSelectedRow from '@/hooks/useSelectedRow';
import { AddOrEditUserModal } from '../modals/AddOrEditUserModal';
import { Patient } from '@/types/Patient';
import EditRowButton from '../buttons/EditRowButton';
import DeleteRowButton from '../buttons/DeleteRowButton';
import { ConfirmDeleteModal } from '../modals/ConfirmDeleteModal';
import { enqueueSnackbar } from 'notistack';

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
    label: 'Імʼя',
  },
  {
    key: 'gender',
    label: 'Стать',
  },
  {
    key: 'date_of_birth',
    label: 'Дата народження',
  },
  {
    key: 'contact_number',
    label: 'Телефон',
  },
  {
    key: 'address',
    label: 'Адреса',
  },
  {
    key: 'user.email',
    label: 'Email',
  },
  {
    key: 'user.username',
    label: 'Логін',
  },
  {
    key: 'created_at',
    label: 'Дата створення',
  },
  {
    key: 'actions',
  },
];

const PatientsTable = () => {
  const { value: openModal, toggle: toggleModal } = useBoolean();
  const { value: openConfirmDelete, toggle: toggleConfirmDelete } =
    useBoolean();

  const { selectedRow, selectRow, clearSelection } = useSelectedRow<Patient>();

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

  const { data: patients, refetch } = useFetch<ResponseData<any>>('/patients', {
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

  const handleCloseModal = () => {
    refetch();
    toggleModal();
    clearSelection();
  };

  const handleOnEditClick = (item: Patient) => {
    selectRow(item);
    toggleModal();
  };

  const handleOnDeleteOpen = (item: Patient) => {
    selectRow(item);
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
            {patients?.data.length &&
              patients.data.map((patient, index) => (
                <TableRow key={patient.id} rowIndex={index}>
                  <TableCell fontMedium textDark>
                    {patient.last_name}
                  </TableCell>
                  <TableCell fontMedium textDark>
                    {patient.first_name}
                  </TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>
                    {new Date(patient.date_of_birth).toLocaleDateString(
                      'uk-UA'
                    )}
                  </TableCell>
                  <TableCell>{patient.contact_number}</TableCell>
                  <TableCell>{patient.address}</TableCell>
                  <TableCell>{patient.user.email}</TableCell>
                  <TableCell>{patient.user.login}</TableCell>
                  <TableCell>
                    {new Date(patient.user.created_at).toLocaleDateString(
                      'uk-UA'
                    )}
                  </TableCell>
                  <TableCell isActions>
                    <EditRowButton
                      item={patient}
                      onEditClick={() => handleOnEditClick(patient)}
                    />
                    <DeleteRowButton
                      item={patient}
                      onDeleteOpen={() => handleOnDeleteOpen(patient)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <AddOrEditUserModal
        mode="patient"
        open={openModal}
        item={selectedRow as Patient}
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

export default PatientsTable;
