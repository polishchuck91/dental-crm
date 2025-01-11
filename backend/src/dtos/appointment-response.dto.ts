import { IsEnum } from 'class-validator';
import { AppointmentStatus } from 'src/enums/appointment-status.enum';
import { PatientDto } from './patients-response.dto';
import { Expose, Type } from 'class-transformer';
import { StaffDto } from './staff-response.dto';

export class AppointmentDto {
  @Expose()
  id: number;

  @Expose()
  appointment_date: Date;

  @IsEnum(AppointmentStatus)
  status: string;

  @Expose()
  notes?: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}

export class AppointmentResposneDto extends AppointmentDto {
  @Expose()
  @Type(() => PatientDto)
  patient: PatientDto;

  @Expose()
  @Type(() => StaffDto)
  staff: StaffDto;
}
