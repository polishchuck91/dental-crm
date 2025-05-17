export interface Appointment {
  id: string;
  appointment_date: string;
  created_at: string;
  updated_at: string;
  patient: {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    contact_number: string;
    date_of_birth: string;
    address: string;
  };
  staff: {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    contact_number: string;
    hire_date: string;
  };
}
