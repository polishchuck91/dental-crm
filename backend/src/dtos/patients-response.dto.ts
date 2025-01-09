import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/dtos/response-user.dto';

export class PatientDto {
  @Expose()
  id: number;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  gender: string;

  @Expose()
  contact_number: string;

  @Expose()
  date_of_birth: Date;

  @Expose()
  address: string;

  @Expose()
  @Type(() => UserResponseDto) // Maps the nested user object
  user: UserResponseDto;

  @Expose()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}

export class PatientsResponseDto extends PatientDto {
  @Expose()
  @Type(() => UserResponseDto) // Maps the nested user object
  user: UserResponseDto;

  @Expose()
  created_at: Date;

  @Exclude() // Excluded for API response
  updated_at: Date;
}
