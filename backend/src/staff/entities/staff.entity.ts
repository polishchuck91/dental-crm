import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { Gender } from '../../enums/gender.enum';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreatePatientDto extends CreateUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @Transform(({ value }) => {
    // Якщо вже ISO-8601 — не змінюємо
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

    // Якщо формат DD.MM.YYYY — трансформуємо
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
      const [day, month, year] = value.split('.');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    return value; // fallback
  })
  @IsDateString()
  date_of_birth: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  contact_number: string;

  @IsOptional()
  address?: string;
}
