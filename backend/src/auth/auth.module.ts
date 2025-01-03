import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AccessTokensModule } from 'src/access-tokens/access-tokens.module';
import { TokenBlacklistService } from 'src/token-blacklist/token-blacklist.service';

@Module({
  imports: [AccessTokensModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, TokenBlacklistService],
  exports: [AuthService],
})
export class AuthModule {}
