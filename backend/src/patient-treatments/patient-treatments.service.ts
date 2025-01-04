import { Injectable } from '@nestjs/common';
import { CreatePatientTreatmentDto } from './dto/create-patient-treatment.dto';
import { UpdatePatientTreatmentDto } from './dto/update-patient-treatment.dto';

@Injectable()
export class PatientTreatmentsService {
  create(createPatientTreatmentDto: CreatePatientTreatmentDto) {
    return 'This action adds a new patientTreatment';
  }

  findAll() {
    return `This action returns all patientTreatments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patientTreatment`;
  }

  update(id: number, updatePatientTreatmentDto: UpdatePatientTreatmentDto) {
    return `This action updates a #${id} patientTreatment`;
  }

  remove(id: number) {
    return `This action removes a #${id} patientTreatment`;
  }
}
