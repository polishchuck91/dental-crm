import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from 'src/dtos/user-credential.dto';
import { IsPublic } from 'src/decorators/is-public.decorator';
import { RefreshTokenDto } from 'src/dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('/login')
  login(@Body() loginDto: UserCredentialDto) {
    return this.authService.login(loginDto.userIdentifier, loginDto.password);
  }

  @IsPublic()
  @Post('/refresh')
  refresh(@Body() { refreshToken }: RefreshTokenDto) {
    return this.authService.refresh(refreshToken);
  }

  @Post('/logout')
  logout(@Body() { refreshToken }: RefreshTokenDto) {
    return this.authService.logout(refreshToken);
  }
}
