import { ChangeEvent, FC, useCallback, useEffect } from 'react';
import TableHeader from '@/components/table/TableHeader';
import TablePagination from '@/components/table/TablePagination';
import TableRow from '@/components/table/TableRow';
import TableSearchField from '@/components/table/TableSearchField';
import { useDataGrid } from '@/hooks/useDataGrid';
import useFetch from '@/hooks/useFetch';
import { useDebounce } from '@/hooks/useDebounce';
import { ResponseData, SortOrder, TableHeaderCell } from '@/types/Common';
import { User } from '@/types/User';
import Table from '@/components/table/Table';
import TableBody from '@/components/table/TableBody';
import TableCell from '@/components/table/TableCell';
import { NoResultsRow } from '@/components/table/NoResultsRow';
import TableToolbar from '@/components/table/TableToolbar';
import OpenAddModalButton from '@/components/buttons/OpenAddModalButton';
import EditRowButton from '@/components/buttons/EditRowButton';
import DeleteRowButton from '@/components/buttons/DeleteRowButton';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { useBoolean } from '@/hooks/useBoolean';
import useSelectedRow from '@/hooks/useSelectedRow';

const headers: TableHeaderCell[] = [
  {
    key: 'username',
    label: 'Ім’я користувача',
    sortable: true,
    order: SortOrder.ASC,
    isDefault: true,
  },
  { key: 'email', label: 'Email', sortable: true, order: SortOrder.ASC },
  { key: 'role', label: 'Роль' },
  {
    key: 'created_at',
    label: 'Дата створення',
    sortable: true,
    order: SortOrder.DESC,
  },
];

const UsersTable: FC = () => {
  const { value: openConfirmDelete, toggle: toggleConfirmDelete } =
    useBoolean();

  const { selectedRow, selectRow, clearSelection } = useSelectedRow<User>();

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

  const { data: users, isLoading } = useFetch<ResponseData<User>>('/users', {
    page,
    limit: pageSize,
    q: debounceQuery.length > 2 ? debounceQuery : undefined,
    field: field || 'username',
    direction: direction || SortOrder.ASC,
  });

  const handleOnQueryChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setSearchQuery(evt.target.value);
    },
    [setPage, setSearchQuery]
  );

  const handleOnEditClick = (user: User) => {
    selectRow(user);
  };

  const handleOnDeleteOpen = (user: User) => {
    selectRow(user);
    toggleConfirmDelete();
  };

  const handleOnDeleteClose = () => {
    toggleConfirmDelete();
    clearSelection();
  };

  const handleOnDelete = async () => {
    if (!selectedRow?.id) return;
  };

  useEffect(() => {
    if (users?.total) {
      setTotalItems(users.total);
    }
  }, [users?.total, setTotalItems]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">Loading...</div>
    );
  }

  return (
    <div className="p-4">
      <div className="relative overflow-x-auto rounded-lg bg-white shadow-md dark:bg-gray-900">
        <TableToolbar>
          <TableSearchField
            autoFocus
            value={searchQuery}
            onChange={handleOnQueryChange}
          />
        </TableToolbar>

        <Table>
          <TableHeader headers={headers} />
          <TableBody>
            {users?.data?.length ? (
              users.data.map((user, index) => (
                <TableRow key={user.id} rowIndex={index}>
                  <TableCell fontMedium textDark>
                    {user.username}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {new Date(user?.created_at).toLocaleString('uk-UA')}
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

        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          perPage={users?.limit ?? pageSize}
          totalItems={users?.total ?? 0}
        />
      </div>

      <ConfirmDeleteModal
        open={openConfirmDelete}
        onClose={handleOnDeleteClose}
        onConfirm={handleOnDelete}
      />
    </div>
  );
};

export default UsersTable;
