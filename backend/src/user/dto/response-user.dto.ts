import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { UserRole } from 'src/user/entities/user.entity';

export class UserResponseDto {
  @IsUUID('4', { message: 'The id must be a valid UUID.' })
  id: string;

  username: string;
  email: string;
  role: UserRole;

  @Exclude()
  password: string;

  createdAt: Date;

  updatedAt: Date;
}
