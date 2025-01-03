import { IsJWT, IsNotEmpty, IsUUID } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}
