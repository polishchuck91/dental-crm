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
    private readonly blacklistService: TokenBlacklistService,
  ) {}

  /**
   * Authenticate a user and generate access and refresh tokens.
   * @param userIdentifier - The user's email or username.
   * @param password - The user's password.
   * @returns User information along with generated tokens.
   */
  async login(userIdentifier: string, password: string) {
    // Find user by email or username
    const user = userIdentifier.includes('@')
      ? await this.userService.findUserByEmail(userIdentifier)
      : await this.userService.findUserByUsername(userIdentifier);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
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
      userId: user.id,
      email: user.email,
      role: user.role,
      accessToken,
      refreshToken,
    };
  }

  /**
   * Blacklist a token during user logout.
   * @param token - The token to blacklist.
   */
  async logout(token: string) {
    await this.blacklistService.addTokenToBlacklist(token);
  }

  /**
   * Refresh tokens by validating and rotating the refresh token.
   * @param token - The refresh token.
   * @returns New access and refresh tokens.
   */
  async refresh(token: string) {
    // Check if the token is blacklisted

    const isBlacklisted = await this.blacklistService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      throw new UnauthorizedException('Invalid or blacklisted token');
    }

    let payload;
    try {
      // Verify the refresh token
      payload = await this.tokenService.verifyRefreshToken(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Retrieve the user by ID from the token payload
    const user = await this.userService.findOne(payload['sub']);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    console.log(user);

    // Blacklist the used refresh token
    await this.blacklistService.addTokenToBlacklist(token);

    // Generate new access and refresh tokens
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken(user.id, user.role),
      this.tokenService.generateRefreshToken(user.id),
    ]);

    return {
      userId: user.id,
      accessToken,
      refreshToken,
    };
  }
}
