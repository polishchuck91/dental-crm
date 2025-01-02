import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from 'src/dtos/user-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: UserCredentialDto) {
    return this.authService.login(loginDto.userIdentifier, loginDto.password);
  }
}
