import { IsOptional, IsInt, Min, Max, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(-1) // Allow -1 to disable pagination
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(-1) // Allow -1 to disable pagination
  limit?: number = 10;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  field?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  direction?: 'ASC' | 'DESC' = 'ASC';
}
