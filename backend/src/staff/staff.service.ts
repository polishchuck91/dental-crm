import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
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

    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new ConflictException();
    }

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
    const { page, limit, q, orderBy } = paginationDto;

    const staffQuery = await this.staffRepository
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.user', 'user')
      .select([
        // Staff fields
        'staff.id',
        'staff.first_name',
        'staff.last_name',
        'staff.gender',
        'staff.contact_number',
        'staff.created_at',
        'user.id',
        'user.email',
      ]);

    const searchFields = [
      'first_name',
      'last_name',
      'contact_number',
      'user.email',
    ];

    const paginatedResult = await paginate(
      staffQuery,
      page,
      limit,
      searchFields,
      q,
      orderBy || [{ field: 'staff.created_at', direction: 'DESC' }],
    );

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

  async findOne(id: string): Promise<StaffResponseDto> {
    // Query the staff entity and join the user relation
    const staff = await this.staffRepository
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.user', 'user') // Join user relation
      .where('staff.id = :id', { id }) // Use the correct field (staff.id)
      .getOne();

    // Throw an error if no staff is found
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found.`);
    }

    // Transform the entity to the DTO
    return plainToInstance(StaffResponseDto, staff, {
      excludeExtraneousValues: true, // Only include explicitly exposed fields
    });
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const staff = await this.staffRepository.findOneBy({ id });
    if (!staff) {
      throw new NotFoundException();
    }

    const updatedStaff = this.staffRepository.merge(staff, updateStaffDto);
    return this.staffRepository.save(updatedStaff);
  }

  async remove(id: number): Promise<void> {
    // Find the staff entity and load the related user
    const staff = await this.staffRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found.`);
    }

    // Remove the staff; cascading delete will handle the user
    await this.userRepository.remove(staff.user);
  }
}
