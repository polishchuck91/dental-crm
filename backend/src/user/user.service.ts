import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/response-user.dto';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';

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

  findAll(): string {
    return 'This action returns all users';
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });
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

  // Refactor to get current user based on request
  async getMySelf(request: Request): Promise<UserResponseDto> {
    const mySelf = await this.userRepository.findOneBy({
      id: request['user']['id'],
    });

    if (!mySelf) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(UserResponseDto, mySelf);
  }

  update(id: number, updateUserDto: UpdateUserDto): string {
    return `This action updates a #${id} user`;
  }

  remove(id: number): string {
    return `This action removes a #${id} user`;
  }
}
