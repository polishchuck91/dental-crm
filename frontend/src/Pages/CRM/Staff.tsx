import StaffTable from '@/components/tables/StaffTable';
import { DataGridProvider } from '@/providers/DataGridProvider';

const Staff = () => {
  return (
    <DataGridProvider>
      <StaffTable />
    </DataGridProvider>
  );
};

export default Staff;
