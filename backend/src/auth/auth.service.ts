import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';
import { AccessTokensService } from 'src/access-tokens/access-tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: AccessTokensService,
  ) {}

  async login(userIdentifier: string, password: string) {
    const user = userIdentifier.includes('@')
      ? await this.userService.findUserByEmail(userIdentifier)
      : await this.userService.findUserByUsername(userIdentifier);

    const isPasswordMatch = await bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.tokenService.generateAccessToken(
      user.id,
      user.role,
    );
    const refreshToken = await this.tokenService.generateRefreshToken(user.id);

    return {
      user: user.email,
      role: user.role,
      accessToken,
      refreshToken,
    };
  }

  async refresh(token: string) {
    try {
      const payload = await this.tokenService.verifyRefreshToken(token);

      const user = await this.userService.findOne(payload['id']);

      const accessToken = await this.tokenService.generateAccessToken(
        user.id,
        user.role,
      );

      const refreshToken = await this.tokenService.generateRefreshToken(
        user.id,
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
