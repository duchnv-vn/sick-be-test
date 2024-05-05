import { AuthGuard } from '@nestjs/passport';
import { GetUserInfo } from './get-user-info.guard';

export const BasicAuthGuard = [AuthGuard('jwt'), GetUserInfo];
