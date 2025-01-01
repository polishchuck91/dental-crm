import { IsEnum, IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from '../../entities/user.entity'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
