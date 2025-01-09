import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { Billing } from './entities/billing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billing, Appointment])],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
