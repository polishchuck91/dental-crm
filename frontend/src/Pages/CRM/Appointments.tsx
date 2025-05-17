import AppointmentsTable from '@/components/tables/AppointmentsTable';

import { DataGridProvider } from '@/providers/DataGridProvider';
import { useState } from 'react';

const Appointments = () => {
  const [selected, setSelected] = useState<{
    label: string;
    value: string;
  } | null>(null);

  return (
    <DataGridProvider>
      <AppointmentsTable />
    </DataGridProvider>
  );
};

export default Appointments;
