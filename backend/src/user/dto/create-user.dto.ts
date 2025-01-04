import { IsEnum, IsOptional } from 'class-validator';
import { BaseUserDto } from 'src/dtos/base-user.dto';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto extends BaseUserDto {
  @IsOptional()
  @IsEnum(Role, {
    message: `Role must be one of: ${Object.values(Role).join(', ')}`,
  })
  role?: Role; // Optional role field
}
