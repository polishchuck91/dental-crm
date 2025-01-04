import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePatientTreatmentDto {
  @IsNotEmpty()
  patient_id: number;

  @IsNotEmpty()
  treatment_id: number;

  @IsNotEmpty()
  appointment_id: number;

  @IsOptional()
  notes?: string;
}
