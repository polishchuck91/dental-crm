import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { PaginationDto } from 'src/dtos/pagination-dto';
import { BillingResponseDto } from 'src/dtos/billing-response.dto';
import { Billing } from './entities/billing.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { paginate, PaginatedResult } from 'src/common/utils/pagination.util';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Billing)
    private readonly billingRepository: Repository<Billing>,
  ) {}

  /**
   * Create a new billing record.
   */
  async create(
    createBillingDto: CreateBillingDto,
  ): Promise<BillingResponseDto> {
    const {
      appointment_id,
      total_amount,
      description,
      payment_date,
      payment_status,
    } = createBillingDto;

    // Find the associated appointment
    const appointment = await this.appointmentRepository.findOne({
      where: { id: appointment_id },
    });

    if (!appointment) {
      throw new BadRequestException(
        `Appointment with ID ${appointment_id} not found.`,
      );
    }

    // Create and save the billing record
    const billingRecord = this.billingRepository.create({
      total_amount,
      description,
      payment_date,
      payment_status,
      appointment,
    });

    const savedBilling = await this.billingRepository.save(billingRecord);

    return plainToInstance(BillingResponseDto, savedBilling, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Retrieve all billing records with pagination.
   */
  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<BillingResponseDto>> {
    const { page, limit } = paginationDto;

    const billsQuery = await this.billingRepository
      .createQueryBuilder('billings')
      .select([
        'billings.id',
        'billings.total_amount',
        'billings.description',
        'billings.payment_status',
        'billings.payment_date',
      ])
      .addSelect(['appointment.id', 'appointment.appointment_date'])
      .addSelect([
        'patient.first_name',
        'patient.last_name',
        'patient.gender',
        'patient.contact_number',
        'patient.date_of_birth',
      ])
      .addSelect(['user.email'])
      .addSelect(['staff.first_name', 'staff.last_name'])
      .leftJoin('billings.appointment', 'appointment')
      .leftJoin('appointment.patient', 'patient')
      .leftJoin('patient.user', 'user')
      .leftJoin('appointment.staff', 'staff');

    const paginatedResult = await paginate(billsQuery, page, limit);

    const transformeredData = plainToInstance(
      BillingResponseDto,
      paginatedResult.data,
      { excludeExtraneousValues: true },
    );

    return {
      ...paginatedResult,
      data: transformeredData,
    };
  }

  /**
   * Retrieve a single billing record by ID.
   */
  async findOne(id: string): Promise<BillingResponseDto> {
    const billingRecord = await this.billingRepository
      .createQueryBuilder('billing')
      .where('billing.id = :id', { id })
      .select([
        'billing.id',
        'billing.total_amount',
        'billing.description',
        'billing.payment_status',
        'billing.payment_date',
      ])
      .leftJoinAndSelect('billing.appointment', 'appointment')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .leftJoinAndSelect('patient.user', 'user')
      .leftJoinAndSelect('appointment.staff', 'staff')
      .addSelect(['appointment.id', 'appointment.appointment_date'])
      .addSelect([
        'patient.first_name',
        'patient.last_name',
        'patient.gender',
        'patient.contact_number',
        'patient.date_of_birth',
      ])
      .addSelect(['user.email'])
      .addSelect(['staff.first_name', 'staff.last_name'])
      .getOne();

    if (!billingRecord) {
      throw new NotFoundException(`Billing record with ID ${id} not found.`);
    }

    return plainToInstance(BillingResponseDto, billingRecord, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Update an existing billing record.
   */
  async update(
    id: string,
    updateBillingDto: UpdateBillingDto,
  ): Promise<BillingResponseDto> {
    const billingRecord = await this.billingRepository.findOne({
      where: { id },
    });

    if (!billingRecord) {
      throw new NotFoundException(`Billing record with ID ${id} not found.`);
    }

    const updatedBilling = this.billingRepository.merge(
      billingRecord,
      updateBillingDto,
    );
    const savedBilling = await this.billingRepository.save(updatedBilling);

    return plainToInstance(BillingResponseDto, savedBilling, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Delete a billing record by ID.
   */
  async remove(id: string): Promise<void> {
    const billingRecord = await this.billingRepository.findOne({
      where: { id },
    });

    if (!billingRecord) {
      throw new NotFoundException(`Billing record with ID ${id} not found.`);
    }

    await this.billingRepository.delete(id);
  }
}
