import { Injectable } from '@nestjs/common';
import redis from 'src/redis';

@Injectable()
export class TokenBlacklistService {
  constructor() {}

  async setBlacklistToken(token: string, expiresIn: number): Promise<void> {
    await redis.set(`blacklist:${token}`, 'true', 'EX', expiresIn);
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await redis.get(`blacklist:${token}`);
    return result === 'true';
  }
}
