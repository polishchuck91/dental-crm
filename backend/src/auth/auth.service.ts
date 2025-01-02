import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

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

  async login(userIdentifier: string, password: string) {
    const user = userIdentifier.includes('@')
      ? await this.userService.findUserByEmail(userIdentifier)
      : await this.userService.findUserByUsername(userIdentifier);

    const isPasswordMatch = await bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      user: user.email,
      role: user.role,
      accessToken,
      refreshToken,
    };
  }
}
