import { IsNotEmpty, IsOptional, IsDecimal } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTreatmentDto {
  @IsNotEmpty()
  treatment_name: string;

  @IsOptional()
  description?: string;

  @Transform(({ value }) => value?.toString())
  @IsDecimal()
  cost: number;

  @IsOptional()
  cost_comment: string;
}
