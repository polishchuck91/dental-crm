import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Employee } from 'src/entities/employee.entity';
import { UserService } from 'src/user/user.service';
import { UserDetail } from 'src/entities/user-detail.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<UserDetail> {
    const { username, email, password, role, first_name, last_name, phone } =
      createEmployeeDto;

    // Використання queryRunner для транзакції
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Створення користувача
      const user = await this.userService.create({
        username,
        email,
        role,
        password,
      });

      // Створення запису співробітника
      const employee = await queryRunner.manager.save(
        this.employeeRepository.create({ first_name, last_name, phone }),
      );

      // Створення запису з деталями
      const detail = await queryRunner.manager.save(
        this.userDetailRepository.create({ user, employee }),
      );

      // Підтвердження транзакції
      await queryRunner.commitTransaction();

      return detail;
    } catch (error) {
      // У разі помилки, скасувати транзакцію
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        `Failed to create employee: ${error.message}`,
      );
    } finally {
      // Завершення роботи queryRunner
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Employee[]> {
    try {
      return await this.employeeRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve employees: ${error.message}`,
      );
    }
  }

  async findOne(id: number): Promise<Employee> {
    try {
      const employee = await this.employeeRepository.findOne({ where: { id } });
      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }
      return employee;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve employee: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    try {
      const employee = await this.findOne(id);

      const updatedEmployee = this.employeeRepository.merge(
        employee,
        updateEmployeeDto,
      );
      return await this.employeeRepository.save(updatedEmployee);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update employee: ${error.message}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const employee = await this.findOne(id);
      await this.employeeRepository.remove(employee);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to remove employee: ${error.message}`,
      );
    }
  }
}
