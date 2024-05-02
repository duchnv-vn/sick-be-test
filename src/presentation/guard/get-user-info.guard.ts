import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { UserRepository } from '../../infrastructure/repository/user/user.repository';
import { UserNotExistException } from '../exception/user-not-exist.exception';

@Injectable()
export class GetUserInfo implements CanActivate {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpService: HttpService,
    private readonly userRepo: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const req = context.switchToHttp().getRequest();
      const authorizationStr =
        req.headers['authorization'] || req.headers['Authorization'] || '';
      const userInfoPath = req.user?.userInfo || '';

      if (!userInfoPath) {
        throw new UserNotExistException();
      }

      const res = await this.httpService.axiosRef.get(userInfoPath, {
        headers: { Authorization: authorizationStr },
      });

      if (!res.data?.sub) {
        throw new UserNotExistException();
      }

      const isExist = await this.userRepo.checkExistBy({
        email: res.data.email,
      });

      if (!isExist) {
        throw new UserNotExistException();
      }

      delete req.user?.userInfo;
      Object.assign(req.user, {
        _id: getUserIdFromAuth0Sub(res.data.sub),
        email: res.data.email,
        name: res.data.name,
        avatarUrl: res.data.picture,
      });

      return true;
    } catch (error) {
      this.logger.log('GetUserInfoError', error);
      throw error;
    }
  }
}

const getUserIdFromAuth0Sub = (sub: string) => {
  const splittedSub = sub.split('|');
  const id = splittedSub[1];
  return Number(id);
};
