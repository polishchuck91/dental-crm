import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/dtos/response-user.dto';
import { Role } from 'src/enums/role.enum';

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
  role: Role;

  @Expose()
  contact_number: string;

  @Expose()
  hire_date: string;

  @Expose()
  @Type(() => UserResponseDto) // Maps the nested user object
  user: UserResponseDto;
}

export class StaffResponseDto extends StaffDto {
  @Expose()
  @Type(() => UserResponseDto) // Maps the nested user object
  user: UserResponseDto;

  @Expose()
  created_at: string;

  @Exclude() // Excluded for API response
  updated_at: string;
}
