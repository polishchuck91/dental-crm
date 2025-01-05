import { Exclude, Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class UserResponseDto {
  @Expose()
  @IsUUID('4', { message: 'The id must be a valid UUID.' })
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  role: Role;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
