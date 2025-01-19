import { Expose, Type } from 'class-transformer';
import { StaffDto } from './staff-response.dto';
import { UserResponseDto } from 'src/dtos/response-user.dto';
import { PatientDto } from './patients-response.dto';

export class MySelfDtoResponse extends UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => StaffDto)
  staff: StaffDto;

  @Expose()
  @Type(() => PatientDto)
  patient: PatientDto;
}
