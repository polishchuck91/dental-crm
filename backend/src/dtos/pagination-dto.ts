import {
  IsOptional,
  IsInt,
  Min,
  IsPositive,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  field: string;

  @IsString()
  @IsOptional()
  direction: 'ASC' | 'DESC' = 'ASC'; // Default to ASC if not specified
}
