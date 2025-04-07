export interface PatientBase {
  first_name: string;
  last_name: string;
  gender: 'male' | 'female' | 'other';
  contact_number: string;
  date_of_birth: string; // ISO 8601 string (e.g., "1990-01-01")
  email: string;
  username: string;
  password: string;
}

export interface Patient extends PatientBase {
  id: number;
  created_at: string;
  updated_at: string;
}
