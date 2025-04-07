import { StaffBase } from '@/types/Staff';
import axiosInstance from '../axiosInstance';
import { Patient } from '@/types/Patient';

export const createPatient = async (data: Patient) =>
  await axiosInstance.post('/patients', data);

export const updatePatient = (data: StaffBase) => console.log(data);
