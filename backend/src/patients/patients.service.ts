import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { PaginationDto } from 'src/dtos/pagination-dto';
import { paginate, PaginatedResult } from 'src/common/utils/pagination.util';
import { PatientsResponseDto } from 'src/dtos/patients-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const {
      first_name,
      last_name,
      role,
      gender,
      contact_number,
      date_of_birth,
      username,
      email,
      password,
    } = createPatientDto;

    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new ConflictException();
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const formattedHireDate = new Date(date_of_birth)
        .toISOString()
        .split('T')[0];

      const user = queryRunner.manager.create(User, {
        username,
        email,
        password,
        role,
      });

      await queryRunner.manager.save(user);

      const patient = queryRunner.manager.create(Patient, {
        first_name,
        last_name,
        gender,
        contact_number,
        date_of_birth: formattedHireDate,
        user,
      });

      await queryRunner.manager.save(patient);

      // commit transaction now:
      await queryRunner.commitTransaction();

      return patient;
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
  ): Promise<PaginatedResult<PatientsResponseDto>> {
    const { page, limit, q, orderBy } = paginationDto;

    const patientsQuery = await this.patientRepository
      .createQueryBuilder('patients')
      .leftJoinAndSelect('patients.user', 'user');

    const searchFields = [
      'first_name',
      'last_name',
      'contact_number',
      'user.email',
    ];

    const paginatedResult = await paginate(
      patientsQuery,
      page,
      limit,
      searchFields,
      q,
      orderBy || [{ field: 'patients.created_at', direction: 'DESC' }],
    );

    const transfromData = plainToInstance(
      PatientsResponseDto,
      paginatedResult.data,
      {
        excludeExtraneousValues: true,
      },
    );

    return {
      ...paginatedResult,
      data: transfromData,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  async remove(id: number): Promise<void> {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!patient) {
      throw new NotFoundException(`Staff with ID ${id} not found.`);
    }

    // Remove the staff; cascading delete will handle the user
    await this.userRepository.remove(patient.user);
  }
}
