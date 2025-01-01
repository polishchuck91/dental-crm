import { Controller } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';

@Controller()
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}
}
