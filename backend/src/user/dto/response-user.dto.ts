import { Exclude } from 'class-transformer';
import { UserRole } from 'src/entities/user.entity';

export class UserResponseDto {
  id: number;
  username: string;
  email: string;
  role: UserRole;

  @Exclude()
  password: string;
}
