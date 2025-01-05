import { IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { Gender } from 'src/enums/gender.enum';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateStaffDto extends CreateUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  contact_number: string;

  @IsEnum(Gender, {
    message: 'gender must be one of the following values: Male, Female, Other',
  })
  gender: Gender; // Use Gender type to align with the entity

  @IsDateString()
  hire_date: string;
}
