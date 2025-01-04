import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Gender } from '../../enums/gender.enum';

export class CreatePatientDto {
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

  @IsEmail()
  email: string;

  @IsOptional()
  address?: string;
}
