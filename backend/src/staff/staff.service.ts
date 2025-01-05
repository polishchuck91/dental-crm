import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { paginate, PaginatedResult } from 'src/common/utils/pagination.util';
import { PaginationDto } from 'src/dtos/pagination-dto';
import { StaffResponseDto } from 'src/dtos/staff-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createStaffDto: CreateStaffDto): Promise<StaffResponseDto> {
    const {
      first_name,
      last_name,
      role,
      gender,
      contact_number,
      hire_date,
      username,
      email,
      password,
    } = createStaffDto;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const formattedHireDate = new Date(hire_date).toISOString().split('T')[0];

      const user = queryRunner.manager.create(User, {
        username,
        email,
        password,
        role,
      });

      await queryRunner.manager.save(user);

      const staff = queryRunner.manager.create(Staff, {
        first_name,
        last_name,

        gender,
        contact_number,
        hire_date: formattedHireDate,
        user,
      });

      await queryRunner.manager.save(staff);

      // commit transaction now:
      await queryRunner.commitTransaction();

      return plainToInstance(StaffResponseDto, staff, {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<StaffResponseDto>> {
    const { page, limit } = paginationDto;

    const staffQuery = this.staffRepository
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.user', 'user');

    const paginatedResult = await paginate(staffQuery, page, limit);

    const transformedData = plainToInstance(
      StaffResponseDto,
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

  findOne(id: number) {
    return `This action returns a #${id} staff`;
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} staff`;
  }

  remove(id: number) {
    return `This action removes a #${id} staff`;
  }
}
