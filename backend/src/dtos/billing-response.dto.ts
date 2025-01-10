import { Expose, Transform, Type } from 'class-transformer';
import { AppointmentResposneDto } from './appointment-response.dto';

export class BillingDto {
  @Expose()
  id: string;

  @Expose()
  total_amount: string;

  @Expose()
  description: string | null;

  @Expose()
  payment_status: string;

  @Expose()
  @Transform(({ value }) => (value ? value.toISOString() : null), {
    toPlainOnly: true,
  })
  payment_date: Date | null;

  @Expose()
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  created_at: Date;

  @Expose()
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  updated_at: Date;
}

export class BillingResponseDto extends BillingDto {
  @Expose()
  @Type(() => AppointmentResposneDto)
  appointment: AppointmentResposneDto;
}
