import { Module } from '@nestjs/common';
import { PatientTreatmentsService } from './patient-treatments.service';
import { PatientTreatmentsController } from './patient-treatments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientTreatment } from './entities/patient-treatment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientTreatment])],
  controllers: [PatientTreatmentsController],
  providers: [PatientTreatmentsService],
})
export class PatientTreatmentsModule {}
