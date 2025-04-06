import { Staff, StaffBase } from '@/types/Staff';
import axiosInstance from '../axiosInstance';

export const createStaff = async (data: StaffBase) =>
  await axiosInstance.post('/staff', data);

export const updateStaff = async (id: number | undefined, data: Staff) =>
  await axiosInstance.patch(`/staff/${id}`, data);
