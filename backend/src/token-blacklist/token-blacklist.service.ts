import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessTokensService } from 'src/access-tokens/access-tokens.service';
import redis from 'src/redis';

@Injectable()
export class TokenBlacklistService {
  constructor(private readonly accessTokenService: AccessTokensService) {}

  /**
   * Add a token to the blacklist.
   * @param token The token to be blacklisted.
   */
  async addTokenToBlacklist(token: string): Promise<void> {
    try {
      // Verify the refresh token and extract the payload
      const payload = await this.accessTokenService.verifyRefreshToken(token);

      // Calculate token expiration in seconds
      const currentTime = Math.floor(Date.now() / 1000);
      const expiresIn = payload.exp - currentTime;

      if (expiresIn > 0) {
        await redis.set(`blacklist:${token}`, 'true', 'EX', expiresIn);
      } else {
        throw new UnauthorizedException('Token has already expired');
      }
    } catch (error) {
      throw new UnauthorizedException(
        'Failed to blacklist token',
        error.message,
      );
    }
  }

  /**
   * Check if a token is blacklisted.
   * @param token The token to check.
   * @returns `true` if the token is blacklisted, otherwise `false`.
   */
  async isTokenBlacklisted(token: string): Promise<boolean> {
    try {
      const result = await redis.get(`blacklist:${token}`);
      return result === 'true';
    } catch (error) {
      throw new UnauthorizedException(
        'Failed to check token blacklist',
        error.message,
      );
    }
  }
}
