import { Expose } from 'class-transformer';

export class TreatmentResponseDto {
  @Expose()
  id: number;

  @Expose()
  treatment_name: string;

  @Expose()
  description: string;

  @Expose()
  cost: number;

  @Expose()
  cost_comment: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
