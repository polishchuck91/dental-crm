import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Gender } from '../../enums/gender.enum';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreatePatientDto extends CreateUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsDateString()
  date_of_birth: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  contact_number: string;

  @IsOptional()
  address?: string;
}
