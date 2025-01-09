import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Billing } from './entities/billing.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { PaginationDto } from 'src/dtos/pagination-dto';
import { paginate, PaginatedResult } from 'src/common/utils/pagination.util';
import { BillingResposneDto } from 'src/dtos/billing-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Billing)
    private readonly billingRepository: Repository<Billing>,
  ) {}

  async create(createBillingDto: CreateBillingDto) {
    const {
      appointment_id,
      total_amount,
      description,
      payment_date,
      payment_status,
    } = createBillingDto;

    // Find the associated appointment by ID
    const appointment = await this.appointmentRepository.findOne({
      where: { id: appointment_id },
    });

    // Handle the case where the appointment doesn't exist
    if (!appointment) {
      throw new BadRequestException(
        `Appointment with ID ${appointment_id} not found.`,
      );
    }

    // Prepare the Billing entity, including the appointment
    const bill = this.billingRepository.create({
      total_amount,
      description,
      payment_date,
      payment_status, // Default to Pending if no status is provided
      appointment: appointment,
    });

    // Save the Billing record to the database
    const savedBill = await this.billingRepository.save(bill);
    return savedBill;
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<BillingResposneDto>> {
    const { page, limit } = paginationDto;
    const billsQuery = await this.billingRepository
      .createQueryBuilder('billings')
      .leftJoinAndSelect('billings.appointment', 'appointment')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .leftJoinAndSelect('patient.user', 'user')
      .leftJoinAndSelect('appointment.staff', 'staff');

    const paginatedResult = await paginate(billsQuery, page, limit);

    const transformeredData = plainToInstance(
      BillingResposneDto,
      paginatedResult.data,
      { excludeExtraneousValues: true },
    );

    return {
      ...paginatedResult,
      data: transformeredData,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} billing`;
  }

  update(id: number, updateBillingDto: UpdateBillingDto) {
    return `This action updates a #${id} billing`;
  }

  remove(id: number) {
    return `This action removes a #${id} billing`;
  }
}
