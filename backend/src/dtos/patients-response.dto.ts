import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/dtos/response-user.dto';

export class StaffDto {
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
  date_of_birth: string;

  @Expose()
  address: string;

  @Expose()
  @Type(() => UserResponseDto) // Maps the nested user object
  user: UserResponseDto;

  @Expose()
  created_at: string;

  @Exclude()
  updated_at: string;
}

export class PatientsResponseDto extends StaffDto {
  @Expose()
  @Type(() => UserResponseDto) // Maps the nested user object
  user: UserResponseDto;

  @Expose()
  created_at: string;

  @Exclude() // Excluded for API response
  updated_at: string;
}
