import { Module } from '@nestjs/common';
import { AccessTokensService } from './access-tokens.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret:
        'bdc6a77fcfb4c8f6df0a64b9f4aebae8f539d4b8c2c70f9a3fd938f9e4f8eeda',
      signOptions: { expiresIn: '15m' }, // Access token expiration
    }),
  ],
  providers: [AccessTokensService],
  exports: [AccessTokensService],
})
export class AccessTokensModule {}
