import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessTokensService } from './access-tokens.service';
import { TokenBlacklistService } from 'src/token-blacklist/token-blacklist.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '15m' }, // Access token expiration
      }),
    }),
  ],
  providers: [AccessTokensService, TokenBlacklistService],
  exports: [AccessTokensService],
})
export class AccessTokensModule {}
