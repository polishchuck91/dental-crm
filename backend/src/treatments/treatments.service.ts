import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Treatment } from './entities/treatment.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/dtos/pagination-dto';
import { paginate, PaginatedResult } from 'src/common/utils/pagination.util';
import { TreatmentResponseDto } from 'src/dtos/treatment-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectRepository(Treatment)
    private treatmentRepository: Repository<Treatment>,
  ) {}

  async create(
    createTreatmentDto: CreateTreatmentDto,
  ): Promise<TreatmentResponseDto> {
    const treatment = this.treatmentRepository.create(createTreatmentDto);
    const result = await this.treatmentRepository.save(treatment);

    return plainToInstance(TreatmentResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<TreatmentResponseDto>> {
    const { page, limit, q, field, direction } = paginationDto;
    const queryBuilder =
      await this.treatmentRepository.createQueryBuilder('treatments');

    const searchFields = ['treatment_name', 'description'];

    console.log(page, limit);

    const paginatedResult = await paginate(
      queryBuilder,
      page,
      limit,
      searchFields,
      q,
      field,
      direction,
    );

    return {
      ...paginatedResult,
      data: plainToInstance(TreatmentResponseDto, paginatedResult.data, {
        excludeExtraneousValues: true,
      }),
    };
  }

  async findOne(id: number): Promise<TreatmentResponseDto> {
    const treatment = await this.treatmentRepository.findOne({ where: { id } });
    if (!treatment) {
      throw new NotFoundException(`Treatment with ID ${id} not found.`);
    }
    return plainToInstance(TreatmentResponseDto, treatment, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    updateTreatmentDto: UpdateTreatmentDto,
  ): Promise<TreatmentResponseDto> {
    const treatment = await this.findOne(id); // Ensure treatment exists
    if (!treatment) {
      throw new NotFoundException();
    }
    const updatedTreatment = this.treatmentRepository.merge(
      treatment,
      updateTreatmentDto,
    );
    return this.treatmentRepository.save(updatedTreatment);
  }

  async remove(id: number): Promise<void> {
    const treatment = await this.findOne(id); // Ensure treatment exists
    if (!treatment) {
      throw new NotFoundException(`Treatment with ID ${id} not found.`);
    }
    await this.treatmentRepository.remove(treatment);
  }
}
