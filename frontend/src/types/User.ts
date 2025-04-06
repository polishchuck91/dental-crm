import { Role } from '../constants/roles';
import { Staff } from './Staff';

export interface UserBase {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
  staff?: Staff;
  patient?: Patient;
}

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  contactNumber: string;
  dateOfBirth: string;
  address?: Address;
}

export type Gender = 'male' | 'female' | 'other';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
