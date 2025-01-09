import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Patient } from 'src/patients/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Staff, Patient])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
