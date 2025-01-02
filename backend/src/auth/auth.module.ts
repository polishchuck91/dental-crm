import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret:
        'bdc6a77fcfb4c8f6df0a64b9f4aebae8f539d4b8c2c70f9a3fd938f9e4f8eeda',
      signOptions: { expiresIn: '15m' }, // Access token expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
