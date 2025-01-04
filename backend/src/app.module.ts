import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AccessTokensModule } from './access-tokens/access-tokens.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { RolesGuard } from './auth/roles.guard';
import { PatientsModule } from './patients/patients.module';
import { StaffModule } from './staff/staff.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { PatientTreatmentsModule } from './patient-treatments/patient-treatments.module';
import { BillingModule } from './billing/billing.module';

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
    AccessTokensModule,
    PatientsModule,
    StaffModule,
    AppointmentsModule,
    TreatmentsModule,
    PatientTreatmentsModule,
    BillingModule,
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
