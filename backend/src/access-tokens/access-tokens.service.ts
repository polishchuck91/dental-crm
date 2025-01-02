import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/entities/user.entity';

@Injectable()
export class AccessTokensService {
  constructor(private jwtService: JwtService) {}

  async generateAccessToken(userId: string, role: UserRole) {
    const payload = { sub: userId, role }; // 'sub' is a standard claim for subject
    return await this.jwtService.sign(payload);
  }

  async generateRefreshToken(userId: string) {
    const payload = { sub: userId };
    return await this.jwtService.sign(payload, {
      secret:
        'f9a8e6b2df453c5c8f7dfae9939f92d9b53c7a1f6c74a5bd73b43dcf4f8c9fae',
      expiresIn: '7d', // Refresh token expiration
    });
  }

  async verifyAccessToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret:
        'bdc6a77fcfb4c8f6df0a64b9f4aebae8f539d4b8c2c70f9a3fd938f9e4f8eeda',
    });
  }
}
