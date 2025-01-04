import { IsNotEmpty, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { AppointmentStatus } from '../../enums/appointment-status.enum';

export class CreateAppointmentDto {
  @IsNotEmpty()
  patient_id: number;

  @IsNotEmpty()
  staff_id: number;

  @IsDateString()
  appointment_date: string;

  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;

  @IsOptional()
  notes?: string;
}
