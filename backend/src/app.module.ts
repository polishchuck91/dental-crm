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
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AccessTokensModule } from './access-tokens/access-tokens.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenBlacklistService } from './token-blacklist/token-blacklist.service';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

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
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        autoLoadEntities: true,
        synchronize: true, // Disable this in production!
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
    TokenBlacklistService,
  ],
})
export class AppModule {}
