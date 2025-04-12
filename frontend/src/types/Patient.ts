import { Role } from '@/constants/roles';

export interface PatientUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  created_at: string;
}

export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  gender: 'male' | 'female' | 'other';
  contact_number: string;
  date_of_birth: string; // ISO 8601 format
  address: string | null;
  user: PatientUser;
  created_at: string;
  updated_at?: string; // optional if not always present
}
