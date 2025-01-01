import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { EmployeeModule } from './employee/employee.module';
import { PatientModule } from './patient/patient.module';
import { ServiceModule } from './service/service.module';
import { UserDetailModule } from './user-detail/user-detail.module';
import { UserController } from './user/user.controller';
import { AppointmentController } from './appointment/appointment.controller';
import { EmployeeController } from './employee/employee.controller';
import { PatientController } from './patient/patient.controller';
import { ServiceController } from './service/service.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'mydb',
      autoLoadEntities: true, // Автоматичне завантаження сутностей
      synchronize: false, // Використовуйте `true` лише в розробці
    }),
    UserModule,
    AppointmentModule,
    EmployeeModule,
    PatientModule,
    ServiceModule,
    UserDetailModule,
  ],
  controllers: [
    AppController,
    UserController,
    AppointmentController,
    EmployeeController,
    PatientController,
    ServiceController,
  ],
  providers: [AppService],
})
export class AppModule {}
