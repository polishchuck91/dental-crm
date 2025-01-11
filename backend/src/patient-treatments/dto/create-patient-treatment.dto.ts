import { IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreatePatientTreatmentDto {
  @IsNotEmpty()
  patient_id: number;

  @IsArray()
  @IsNotEmpty()
  treatment: string[]; // Singular to match entity

  @IsNotEmpty()
  appointment_id: string;

  @IsOptional()
  notes?: string;
}
