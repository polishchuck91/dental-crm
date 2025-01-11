import { Module } from '@nestjs/common';
import { PatientTreatmentsService } from './patient-treatments.service';
import { PatientTreatmentsController } from './patient-treatments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientTreatment } from './entities/patient-treatment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientTreatment,Patient, Appointment])],
  controllers: [PatientTreatmentsController],
  providers: [PatientTreatmentsService],
})
export class PatientTreatmentsModule {}
