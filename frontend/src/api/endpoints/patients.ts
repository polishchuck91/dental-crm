import axiosInstance from '../axiosInstance';
import { Patient } from '@/types/Patient';

export const createPatient = async (data: Patient) =>
  await axiosInstance.post('/patients', data);

export const updatePatient = async (id: number | undefined, data: Patient) =>
  await axiosInstance.patch(`/patients/${id}`, data);
