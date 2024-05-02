import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { DeviceRepository } from '../../infrastructure/repository/device/device.repository';
import { User } from '../../domain/schema/user/user.interface';
import { DeviceAccessByValidUserException } from '../exception/device-manipulation-by-invalid-user.exception';

@Injectable()
export class DeviceAccessByValidUser implements CanActivate {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpService: HttpService,
    private readonly deviceRepo: DeviceRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const req: Request = context.switchToHttp().getRequest();
      const { _id: userId } = req.user as User;
      const deviceId = Number(req.params?.deviceId || req.query?.deviceId);

      const device = await this.deviceRepo.checkExistBy({
        _id: deviceId,
        userId,
      });

      if (!device) {
        throw new DeviceAccessByValidUserException();
      }

      return true;
    } catch (error) {
      this.logger.log('DeviceAccessByValidUserError', error);
      throw error;
    }
  }
}
