import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class UserResponseDto {
  @IsUUID('4', { message: 'The id must be a valid UUID.' })
  id: string;

  username: string;
  email: string;
  role: Role;

  @Exclude()
  password: string;

  createdAt: Date;

  updatedAt: Date;
}
