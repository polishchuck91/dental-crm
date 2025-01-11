import { PatientDto } from './patients-response.dto';
import { Expose, Type } from 'class-transformer';
import { AppointmentResposneDto } from './appointment-response.dto';

export class PatientTreatmentDto {
  @Expose()
  id: number;

  @Expose()
  treatment: string[]; // Array of treatment descriptions

  @Expose()
  notes: string | null; // Nullable notes field
}

export class PatientTreatmentResponseDto extends PatientTreatmentDto {
  @Expose()
  @Type(() => PatientDto)
  patient: PatientDto; // Relationship with a Patient entity

  @Expose()
  @Type(() => AppointmentResposneDto)
  appointment: AppointmentResposneDto; // Relationship with a Staff entity

  @Expose()
  created_at: Date; // Creation timestamp

  @Expose()
  updated_at: Date; // Last update timestamp
}
