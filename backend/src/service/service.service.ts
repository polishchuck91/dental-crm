import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PaginationDto } from 'src/dtos/pagination-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/entities/service.entity';
import { Repository } from 'typeorm';
import { paginate, PaginatedResult } from 'src/common/utils/pagination.util';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
  ) {}

  create(createServiceDto: CreateServiceDto) {
    return 'This action adds a new service';
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<Service>> {
    const { page, limit } = paginationDto;
    const queryBuilder = this.serviceRepository.createQueryBuilder('user');

    const paginatedResult = await paginate(queryBuilder, page, limit);

    return {
      ...paginatedResult,
      data: paginatedResult.data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
