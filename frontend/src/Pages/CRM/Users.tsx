import UsersTable from '@/components/tables/UsersTable';
import { DataGridProvider } from '@/providers/DataGridProvider';

const UsersList = () => {
  return (
    <DataGridProvider>
      <UsersTable />
    </DataGridProvider>
  );
};

export default UsersList;
