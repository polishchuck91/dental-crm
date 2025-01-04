import { Module } from '@nestjs/common';
import { PatientTreatmentsService } from './patient-treatments.service';
import { PatientTreatmentsController } from './patient-treatments.controller';

@Module({
  controllers: [PatientTreatmentsController],
  providers: [PatientTreatmentsService],
})
export class PatientTreatmentsModule {}
