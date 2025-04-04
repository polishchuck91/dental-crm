import { Treatment } from '@/types/Treatments';
import axiosInstance from './axiosInstance';

export const createTreatment = async (
  treatment: Omit<Treatment, 'id' | 'created_at' | 'updated_at'>
) => await axiosInstance.post(`/treatments/`, { ...treatment });

export const updateTreatment = async (
  id: number,
  treatment: Omit<Treatment, 'id' | 'created_at' | 'updated_at'>
) => await axiosInstance.patch(`/treatments/${id}`, { ...treatment });
