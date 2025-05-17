import { FC, useEffect } from 'react';
import TableHeader from '@/components/table/TableHeader';
import TablePagination from '@/components/table/TablePagination';
import TableRow from '@/components/table/TableRow';
import Table from '@/components/table/Table';
import TableBody from '@/components/table/TableBody';
import TableCell from '@/components/table/TableCell';
import TableToolbar from '@/components/table/TableToolbar';
import TableSearchField from '@/components/table/TableSearchField';
import { useDataGrid } from '@/hooks/useDataGrid';
import useFetch from '@/hooks/useFetch';
import { useDebounce } from '@/hooks/useDebounce';
import { ResponseData, SortOrder, TableHeaderCell } from '@/types/Common';
import { NoResultsRow } from '@/components/table/NoResultsRow';
import { Appointment } from '@/types/Appointment';

const headers: TableHeaderCell[] = [
  {
    key: 'appointment_date',
    label: 'Дата прийому',
    sortable: true,
    order: SortOrder.DESC,
    isDefault: true,
  },
  { key: 'patient', label: 'Пацієнт' },
  { key: 'staff', label: 'Лікар' },
  { key: 'contact', label: 'Контакти' },
];

const AppointmentsTable: FC = () => {
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

  const { data: appointments, isLoading } = useFetch<ResponseData<Appointment>>(
    '/appointments',
    {
      page,
      limit: pageSize,
      q: debounceQuery.length > 2 ? debounceQuery : undefined,
      field: field || 'appointment_date',
      direction: direction || SortOrder.DESC,
    }
  );

  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearchQuery(evt.target.value);
  };

  useEffect(() => {
    if (appointments?.total) {
      setTotalItems(appointments.total);
    }
  }, [appointments?.total, setTotalItems]);

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
            onChange={handleSearchChange}
          />
        </TableToolbar>

        <Table>
          <TableHeader headers={headers} />
          <TableBody>
            {appointments?.data?.length ? (
              appointments.data.map((appointment, index) => (
                <TableRow key={appointment.id} rowIndex={index}>
                  <TableCell textDark>
                    {new Date(appointment.appointment_date).toLocaleString(
                      'uk-UA'
                    )}
                  </TableCell>

                  <TableCell>
                    {appointment.patient.first_name}{' '}
                    {appointment.patient.last_name}
                  </TableCell>

                  <TableCell>
                    {appointment.staff.first_name} {appointment.staff.last_name}
                  </TableCell>

                  <TableCell>
                    <div>Пацієнт: {appointment.patient.contact_number}</div>
                    <div>Лікар: {appointment.staff.contact_number}</div>
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
          perPage={appointments?.limit ?? pageSize}
          totalItems={appointments?.total ?? 0}
        />
      </div>
    </div>
  );
};

export default AppointmentsTable;
