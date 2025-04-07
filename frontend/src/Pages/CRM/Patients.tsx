import { AddOrEditUserModal } from '@/components/modals/AddOrEditUserModal';

const Patients = () => {
  return (
    <div>
      <AddOrEditUserModal
        mode="patient"
        open={true}
        onClose={() => alert()}
        onSuccess={() => alert()}
      />
    </div>
  );
};

export default Patients;
