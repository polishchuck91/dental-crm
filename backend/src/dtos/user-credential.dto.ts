import { IsNotEmpty } from 'class-validator';
import { UserPasswordDto } from './base-user.dto';

export class UserCredentialDto extends UserPasswordDto {
  @IsNotEmpty({ message: 'username/email is required' })
  userIdentifier: string;
}
