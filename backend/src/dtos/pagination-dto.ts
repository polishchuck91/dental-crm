import {
  IsOptional,
  IsInt,
  Min,
  IsPositive,
  IsString,
  IsIn,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderByDto {
  @IsString()
  field: string;

  @IsString()
  @IsOptional()
  direction: 'ASC' | 'DESC' = 'ASC'; // Default to ASC if not specified
}

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
  search?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderByDto)
  orderBy?: OrderByDto[]; // Array of fields and directions
}
