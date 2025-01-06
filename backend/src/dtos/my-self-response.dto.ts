import { Expose, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { StaffDto } from './staff-response.dto';
import { UserResponseDto } from 'src/dtos/response-user.dto';

export class MySelfDtoResponse extends UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => StaffDto)
  staff: StaffDto;
}
