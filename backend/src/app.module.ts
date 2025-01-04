import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { EmployeeModule } from './employee/employee.module';
import { PatientModule } from './patient/patient.module';
import { ServiceModule } from './service/service.module';
import { UserDetailModule } from './user-detail/user-detail.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AccessTokensModule } from './access-tokens/access-tokens.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'mysql'>('database.type'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        autoLoadEntities: true, // Automatically load entities from modules
        synchronize: configService.get<boolean>('database.synchronize'), // Enable only for dev
        logging: configService.get<boolean>('database.logging'), // Enable query logging
      }),
    }),
    AuthModule,
    UserModule,
    AppointmentModule,
    EmployeeModule,
    PatientModule,
    ServiceModule,
    UserDetailModule,
    AccessTokensModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
