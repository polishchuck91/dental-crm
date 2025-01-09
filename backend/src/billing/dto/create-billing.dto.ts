import {
  IsNotEmpty,
  IsDecimal,
  IsEnum,
  IsOptional,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { PaymentStatus } from '../../enums/payment-status.enum';

export class CreateBillingDto {
  @IsNotEmpty()
  @IsUUID('4', { message: 'The id must be a valid UUID.' })
  appointment_id: string;

  @IsOptional()
  description?: string;

  @IsDecimal({ decimal_digits: '2' })
  total_amount: number;

  @IsEnum(PaymentStatus)
  @IsOptional()
  payment_status?: PaymentStatus;

  @IsDateString()
  @IsOptional()
  payment_date?: string;
}
