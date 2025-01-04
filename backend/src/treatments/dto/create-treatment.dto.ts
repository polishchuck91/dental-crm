import { IsNotEmpty, IsOptional, IsDecimal } from 'class-validator';

export class CreateTreatmentDto {
  @IsNotEmpty()
  treatment_name: string;

  @IsOptional()
  description?: string;

  @IsDecimal()
  cost: number;
}
