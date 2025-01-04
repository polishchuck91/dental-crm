import { IsNotEmpty, IsEmail, IsEnum, IsDateString } from 'class-validator';
import { Role } from '../../enums/role.enum';

export class CreateStaffDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  contact_number: string;

  @IsEmail()
  email: string;

  @IsDateString()
  hire_date: string;
}
