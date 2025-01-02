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
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
