import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employee.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserDetail } from 'src/entities/user-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, User, UserDetail])],
  controllers: [EmployeeController],
  providers: [EmployeeService, UserService, UserDetail],
  exports: [EmployeeService],
})
export class EmployeeModule {}
