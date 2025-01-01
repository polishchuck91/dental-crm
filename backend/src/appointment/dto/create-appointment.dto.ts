import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  appointment_date: string;

  @IsEnum(['scheduled', 'completed', 'canceled'])
  status: string;

  @IsString()
  @IsOptional()
  notes?: string;
}