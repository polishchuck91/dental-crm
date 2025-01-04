import { IsString, IsOptional } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateEmployeeDto extends CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  specialization?: string;
}
