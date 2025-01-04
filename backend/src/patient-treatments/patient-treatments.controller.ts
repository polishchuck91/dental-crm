import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientTreatmentsService } from './patient-treatments.service';
import { CreatePatientTreatmentDto } from './dto/create-patient-treatment.dto';
import { UpdatePatientTreatmentDto } from './dto/update-patient-treatment.dto';

@Controller('patient-treatments')
export class PatientTreatmentsController {
  constructor(private readonly patientTreatmentsService: PatientTreatmentsService) {}

  @Post()
  create(@Body() createPatientTreatmentDto: CreatePatientTreatmentDto) {
    return this.patientTreatmentsService.create(createPatientTreatmentDto);
  }

  @Get()
  findAll() {
    return this.patientTreatmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientTreatmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientTreatmentDto: UpdatePatientTreatmentDto) {
    return this.patientTreatmentsService.update(+id, updatePatientTreatmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientTreatmentsService.remove(+id);
  }
}
