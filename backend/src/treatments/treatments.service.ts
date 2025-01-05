import { Injectable } from '@nestjs/common';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Treatment } from './entities/treatment.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/dtos/pagination-dto';
import { paginate, PaginatedResult } from 'src/common/utils/pagination.util';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectRepository(Treatment)
    private treatmentRepository: Repository<Treatment>,
  ) {}
  create(createTreatmentDto: CreateTreatmentDto) {
    return 'This action adds a new treatment';
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<Treatment>> {
    const { page, limit, search, orderBy } = paginationDto;
    const queryBuilder =
      await this.treatmentRepository.createQueryBuilder('treatments');

    const searchFields = ['treatment_name', 'description'];

    const paginatedResult = await paginate(
      queryBuilder,
      page,
      limit,
      searchFields,
      search,
      orderBy || [{ field: 'treatment_name', direction: 'ASC' }],
    );

    return {
      ...paginatedResult,
      data: paginatedResult.data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} treatment`;
  }

  update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    return `This action updates a #${id} treatment`;
  }

  remove(id: number) {
    return `This action removes a #${id} treatment`;
  }
}
