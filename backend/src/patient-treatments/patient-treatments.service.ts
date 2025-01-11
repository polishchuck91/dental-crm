import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientTreatmentDto } from './dto/create-patient-treatment.dto';
import { UpdatePatientTreatmentDto } from './dto/update-patient-treatment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientTreatment } from './entities/patient-treatment.entity';
import { Repository } from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { PaginationDto } from 'src/dtos/pagination-dto';
import { paginate, PaginatedResult } from 'src/common/utils/pagination.util';
import { PatientTreatmentResponseDto } from 'src/dtos/patient-treatment-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PatientTreatmentsService {
  constructor(
    @InjectRepository(PatientTreatment)
    private readonly patientTreatmentRepository: Repository<PatientTreatment>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async create(
    createPatientTreatmentDto: CreatePatientTreatmentDto,
  ): Promise<PatientTreatment> {
    const { patient_id, treatment, appointment_id, notes } =
      createPatientTreatmentDto;

    const patient = await this.patientRepository.findOneBy({ id: patient_id });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patient_id} not found`);
    }

    const appointment = await this.appointmentRepository.findOneBy({
      id: appointment_id,
    });
    if (!appointment) {
      throw new NotFoundException(
        `Appointment with ID ${appointment_id} not found`,
      );
    }

    const newTreatment = this.patientTreatmentRepository.create({
      patient,
      appointment,
      treatment, // Use singular form, as per the entity
      notes,
    });

    return await this.patientTreatmentRepository.save(newTreatment);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<PatientTreatmentResponseDto>> {
    const { page, limit } = paginationDto;

    const patientTreatmentsQuery = await this.patientTreatmentRepository
      .createQueryBuilder('patientTreatments')
      .leftJoin('patientTreatments.patient', 'patient')
      .leftJoin('patientTreatments.appointment', 'appointment')
      .leftJoin('appointment.staff', 'staff') // Join Staff via Appointment
      .select([
        'patientTreatments.id',
        'patientTreatments.treatment',
        'patientTreatments.notes',
        'patient.first_name',
        'patient.last_name',
        'patient.gender',
        'patient.contact_number',
        'patient.date_of_birth',
        'appointment.id',
        'appointment.appointment_date',
        'staff.first_name',
        'staff.last_name',
      ]);

    const paginatedResult = await paginate(patientTreatmentsQuery, page, limit);

    const transformeredData = plainToInstance(
      PatientTreatmentResponseDto,
      paginatedResult.data,
      {
        excludeExtraneousValues: true,
      },
    );

    return {
      ...paginatedResult,
      data: transformeredData,
    };
  }

  async findOne(id: number): Promise<PatientTreatmentResponseDto> {
    const treatment = await this.patientTreatmentRepository
      .createQueryBuilder('patientTreatment')
      .where('patientTreatment.id = :id', { id })
      .leftJoinAndSelect('patientTreatment.patient', 'patient')
      .leftJoinAndSelect('patientTreatment.appointment', 'appointment')
      .leftJoinAndSelect('appointment.staff', 'staff') // Join Staff via Appointment
      .getOne();

    if (!treatment) {
      throw new NotFoundException(`PatientTreatment with ID ${id} not found`);
    }
    return plainToInstance(PatientTreatmentResponseDto, treatment, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    updatePatientTreatmentDto: UpdatePatientTreatmentDto,
  ) {
    const treatment = await this.patientTreatmentRepository.findOneBy({ id });

    if (updatePatientTreatmentDto.patient_id) {
      const patient = await this.patientRepository.findOne({
        where: { id: updatePatientTreatmentDto.patient_id },
      });
      if (!patient) {
        throw new NotFoundException(
          `Patient with ID ${updatePatientTreatmentDto.patient_id} not found`,
        );
      }
      treatment.patient = patient;
    }
    if (updatePatientTreatmentDto.appointment_id) {
      const appointment = await this.appointmentRepository.findOne({
        where: { id: updatePatientTreatmentDto.appointment_id },
      });
      if (!appointment) {
        throw new NotFoundException(
          `Appointment with ID ${updatePatientTreatmentDto.appointment_id} not found`,
        );
      }
      treatment.appointment = appointment;
    }
    treatment.notes = updatePatientTreatmentDto.notes ?? treatment.notes;
    return await this.patientTreatmentRepository.save(treatment);
  }

  async remove(id: number): Promise<void> {
    const treatment = await this.patientTreatmentRepository.findOneBy({ id });
    await this.patientTreatmentRepository.remove(treatment);
  }
}
