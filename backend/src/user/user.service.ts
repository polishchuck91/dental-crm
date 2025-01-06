import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserResponseDto } from '../dtos/response-user.dto';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { PaginationDto } from 'src/dtos/pagination-dto';
import { paginate, PaginatedResult } from 'src/common/utils/pagination.util';
import { User } from './entities/user.entity';
import { Role } from 'src/enums/role.enum';
import { MySelfDtoResponse } from 'src/dtos/my-self-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Improved create method with combined existence check
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or username already exists',
      );
    }

    const user = this.userRepository.create(createUserDto);
    const result = await this.userRepository.save(user);
    return plainToInstance(UserResponseDto, result);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<UserResponseDto>> {
    const { page, limit, q, orderBy } = paginationDto;

    const queryBuilder = await this.userRepository.createQueryBuilder('users');

    const searchFields = ['username', 'email'];

    const paginatedResult = await paginate(
      queryBuilder,
      page,
      limit,
      searchFields,
      q,
      orderBy || [{ field: 'created_at', direction: 'DESC' }],
    );

    return {
      ...paginatedResult,
      data: plainToInstance(UserResponseDto, paginatedResult.data, {
        excludeExtraneousValues: true,
      }),
    };
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }

    return plainToInstance(UserResponseDto, user);
  }

  // Reusable method for finding a user by either email or username
  private async findUserByField(field: string, value: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ [field]: value });
    if (!user) {
      throw new NotFoundException(`${field} not found`);
    }
    return user;
  }

  // Use reusable findUserByField method
  async findUserByEmail(email: string): Promise<User> {
    return this.findUserByField('email', email);
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.findUserByField('username', username);
  }

  async getMySelf(request: Request) {
    const currentUser: { id: string; role: Role } = request['user'];

    const mySelfQuery = this.userRepository.createQueryBuilder('user');

    if (currentUser.role !== Role.Patient) {
      mySelfQuery.leftJoinAndSelect('user.staff', 'staff');
    }

    try {
      const mySelf = await mySelfQuery
        .where('user.id = :userId', { userId: currentUser.id })
        .getOne();

      if (!mySelf) {
        throw new NotFoundException('User not found');
      }

      const data = plainToInstance(MySelfDtoResponse, mySelf, {
        excludeExtraneousValues: true,
      });

      console.log(data);

      return data;
    } catch (error) {
      throw new Error(`Failed to retrieve user: ${error.message}`);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto): string {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }

    await this.userRepository.delete(id);

    return `This action removes a #${id} user`;
  }
}
