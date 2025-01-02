import { IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../entities/user.entity';
import { BaseUserDto } from 'src/dtos/base-user.dto';

export class CreateUserDto extends BaseUserDto {
  @IsOptional()
  @IsEnum(UserRole, {
    message: `Role must be one of: ${Object.values(UserRole).join(', ')}`,
  })
  role?: UserRole; // Optional role field
}
