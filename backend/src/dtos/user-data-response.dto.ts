import { Expose, Type } from 'class-transformer';
import { StaffDto } from './staff-response.dto';
import { UserResponseDto } from 'src/dtos/response-user.dto';
import { PatientDto } from './patients-response.dto';
import { ValidateNested } from 'class-validator';

export class UserDataResponseDto extends UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => StaffDto)
  staff: StaffDto;

  @Expose()
  @Type(() => PatientDto)
  patient: PatientDto;
}

export class LoginResposneDto {
  @Expose()
  @ValidateNested()
  @Type(() => UserDataResponseDto)
  user: UserDataResponseDto;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
