import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AccessTokensService } from 'src/access-tokens/access-tokens.service';
import { IS_PUBLIC_KEY } from 'src/decorators/is-public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: AccessTokensService,
  ) {}

  /**
   * Determines whether a route can be activated.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if the route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    try {
      // Verify token and attach payload to the request for later use
      const payload = await this.tokenService.verifyAccessToken(token);

      const userData = {
        id: payload['sub'],
        role: payload['role'],
      };

      request['user'] = userData;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired authorization token');
    }

    return true;
  }

  /**
   * Extracts the token from the Authorization header.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers.authorization;
    if (!authorization) {
      return undefined;
    }

    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') {
      throw new UnauthorizedException('Invalid token type');
    }

    return token;
  }
}
