import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { Staff } from 'src/staff/entities/staff.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { PaginationDto } from 'src/dtos/pagination-dto';
import { AppointmentResposneDto } from 'src/dtos/appointment-response.dto';
import { plainToInstance } from 'class-transformer';
import { paginate, PaginatedResult } from 'src/common/utils/pagination.util';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentService: Repository<Appointment>,

    @InjectRepository(Staff)
    private readonly staffService: Repository<Staff>,

    @InjectRepository(Patient)
    private readonly patientService: Repository<Patient>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentResposneDto> {
    const { staff_id, patient_id, appointment_date } = createAppointmentDto;

    // Retrieve staff member
    const staff = await this.staffService.findOneBy({ id: staff_id });
    if (!staff) {
      throw new Error(`Staff member with ID ${staff_id} not found.`);
    }

    // Retrieve patient
    const patient = await this.patientService.findOneBy({ id: patient_id });
    if (!patient) {
      throw new Error(`Patient with ID ${patient_id} not found.`);
    }

    // Create the appointment
    const appointment = await this.appointmentService.create({
      staff,
      patient,
      appointment_date,
    });

    // Save and return the result
    const savedData = await this.appointmentService.save(appointment);

    return plainToInstance(AppointmentResposneDto, savedData, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<AppointmentResposneDto>> {
    const { page, limit, q, field, direction } = paginationDto;

    const appointemntsQuery = await this.appointmentService
      .createQueryBuilder('appointments')
      .leftJoinAndSelect('appointments.staff', 'staff')
      .leftJoinAndSelect('appointments.patient', 'patients');

    const searchFields = [
      'patients.first_name',
      'patients.last_name',
      'staff.first_name',
      'staff.last_name',
    ];

    const paginatedResult = await paginate(
      appointemntsQuery,
      page,
      limit,
      searchFields,
      q,
      field,
      direction,
    );

    const transformedData = plainToInstance(
      AppointmentResposneDto,
      paginatedResult.data,
      {
        excludeExtraneousValues: true,
      },
    );

    return {
      ...paginatedResult,
      data: transformedData,
    };
  }

  async findOne(id: string): Promise<AppointmentResposneDto> {
    const appointment = await this.appointmentService
      .createQueryBuilder('appointments')
      .where('appointments.id = :id', { id })
      .leftJoinAndSelect('appointments.staff', 'staff')
      .leftJoinAndSelect('appointments.patient', 'patients')
      .getOne();

    if (!appointment) {
      throw new NotFoundException();
    }

    return plainToInstance(AppointmentResposneDto, appointment, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentService
      .createQueryBuilder('appointments')
      .leftJoinAndSelect('appointments.staff', 'staff')
      .leftJoinAndSelect('appointments.patient', 'patients')
      .where('appointments.id = :id', { id })
      .getOne();

    if (!appointment) {
      throw new NotFoundException();
    }

    const updatedApointment = await this.appointmentService.merge(
      appointment,
      updateAppointmentDto,
    );

    const updatedData = await this.appointmentService.save(updatedApointment);

    return plainToInstance(AppointmentResposneDto, updatedData, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string) {
    const appointment = await this.appointmentService.findOneBy({ id });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found.`);
    }

    await this.appointmentService.remove(appointment);

    return { message: `Appointment with ID ${id} successfully deleted.` };
  }
}
