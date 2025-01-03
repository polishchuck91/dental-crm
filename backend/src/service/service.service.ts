import { Injectable, NotFoundException } from '@nestjs/common';
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
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.serviceRepository.create(createServiceDto); // Use create for validation
    return await this.serviceRepository.save(service);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<Service>> {
    const { page, limit } = paginationDto;
    const queryBuilder = this.serviceRepository.createQueryBuilder('service');

    return await paginate(queryBuilder, page, limit);
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOneBy({ id });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found.`);
    }
    return service;
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const existingService = await this.findOne(id); // Ensure service exists before updating
    Object.assign(existingService, updateServiceDto); // Update fields in the entity
    return await this.serviceRepository.save(existingService);
  }

  async remove(id: number): Promise<void> {
    const result = await this.serviceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service with ID ${id} not found.`);
    }
  }
}
