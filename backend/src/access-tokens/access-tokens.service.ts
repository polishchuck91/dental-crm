import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRole } from 'src/entities/user.entity';

@Injectable()
export class AccessTokensService {
  private accessSecret: string;
  private refreshSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessSecret = this.configService.get<string>('JWT_ACCESS_SECRET');
    this.refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
  }

  async generateAccessToken(userId: string, role: UserRole): Promise<string> {
    const payload = { sub: userId, role }; // 'sub' is a standard claim for subject
    return this.jwtService.sign(payload, {
      secret: this.accessSecret,
      expiresIn: '15m', // Access token expiration
    });
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const payload = { sub: userId };
    return this.jwtService.sign(payload, {
      secret: this.refreshSecret,
      expiresIn: '7d', // Refresh token expiration
    });
  }

  async verifyAccessToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token, {
      secret: this.accessSecret,
    });
  }

  async verifyRefreshToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token, {
      secret: this.refreshSecret,
    });
  }
}
