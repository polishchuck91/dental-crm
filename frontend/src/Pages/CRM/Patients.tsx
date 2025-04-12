import PatientsTable from '@/components/tables/PatientsTable';
import { DataGridProvider } from '@/providers/DataGridProvider';

const Patients = () => {
  return (
    <DataGridProvider>
      <PatientsTable />
    </DataGridProvider>
  );
};

export default Patients;
