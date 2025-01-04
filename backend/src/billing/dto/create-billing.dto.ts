import {
  IsNotEmpty,
  IsDecimal,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { PaymentStatus } from '../../enums/payment-status.enum';

export class CreateBillingDto {
  @IsNotEmpty()
  patient_id: number;

  @IsNotEmpty()
  appointment_id: number;

  @IsDecimal()
  total_amount: number;

  @IsDecimal()
  @IsOptional()
  amount_paid?: number;

  @IsEnum(PaymentStatus)
  @IsOptional()
  payment_status?: PaymentStatus;

  @IsDateString()
  @IsOptional()
  payment_date?: string;
}
