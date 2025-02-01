import TreatmentsTable from "@/components/tables/TreatmentsTable";
import { DataGridProvider } from "@/providers/DataGridProvider";
import { FC } from "react";

const Treatments: FC = (): JSX.Element => {
  return (
    <DataGridProvider>
      <TreatmentsTable />
    </DataGridProvider>
  );
};

export default Treatments;
