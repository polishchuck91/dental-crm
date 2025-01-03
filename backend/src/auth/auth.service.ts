import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AccessTokensService } from 'src/access-tokens/access-tokens.service';
import { TokenBlacklistService } from 'src/token-blacklist/token-blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: AccessTokensService,
    private readonly blackListService: TokenBlacklistService,
  ) {}

  /**
   * Authenticate a user and generate access and refresh tokens
   */
  async login(userIdentifier: string, password: string) {
    // Find user by email or username
    const user = userIdentifier.includes('@')
      ? await this.userService.findUserByEmail(userIdentifier)
      : await this.userService.findUserByUsername(userIdentifier);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Verify the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate access and refresh tokens
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken(user.id, user.role),
      this.tokenService.generateRefreshToken(user.id),
    ]);

    return {
      user: user.email,
      role: user.role,
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh tokens by validating and rotating the refresh token
   */
  async refresh(token: string) {
    // Check if the token is blacklisted
    const isBlacklisted = await this.blackListService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      throw new UnauthorizedException('Token is blacklisted');
    }

    let payload;
    try {
      // Verify the refresh token
      payload = await this.tokenService.verifyRefreshToken(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Retrieve the user by ID from the payload
    const user = await this.userService.findOne(payload['id']);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Blacklist the used refresh token
    await this.blackListService.setBlacklistToken(token, payload['exp']);

    // Generate new access and refresh tokens
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken(user.id, user.role),
      this.tokenService.generateRefreshToken(user.id),
    ]);

    return { accessToken, refreshToken };
  }
}
