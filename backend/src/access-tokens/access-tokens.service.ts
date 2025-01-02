import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessTokensService {
  constructor(private jwtService: JwtService) {}

  async generateAccessToken(userId: string) {
    const payload = { sub: userId }; // 'sub' is a standard claim for subject
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(userId: string) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload, {
      secret:
        'f9a8e6b2df453c5c8f7dfae9939f92d9b53c7a1f6c74a5bd73b43dcf4f8c9fae',
      expiresIn: '7d', // Refresh token expiration
    });
  }
}
