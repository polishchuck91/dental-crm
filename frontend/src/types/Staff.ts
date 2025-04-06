import { User } from './User';

export interface StaffBase {
  first_name: string;
  last_name: string;
  gender: 'male' | 'female';
  contact_number: string;
  hire_date: string;
}

type StaffUser = Pick<User, 'id' | 'email' | 'role'>;

export interface Staff extends StaffBase {
  id: number;
  user: StaffUser;
  created_at: string;
  updated_at: string;
}
