import { IsEnum, IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from '../../entities/user.entity'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
