import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DeviceRepository } from '../../infrastructure/repository/device/device.repository';
import { RequestExceptionEnum } from '../enum/exception';
import { LoggerService } from '../../infrastructure/logger/logger.service';

@ValidatorConstraint({ name: 'DeviceExist', async: true })
@Injectable()
export class DeviceExistsRule implements ValidatorConstraintInterface {
  constructor(
    private readonly logger: LoggerService,
    private readonly deviceRepo: DeviceRepository,
  ) {}

  async validate(_id: number) {
    try {
      const device = await this.deviceRepo.checkExistBy({ _id });
      return !!device;
    } catch (error) {
      this.logger.log('DeviceExistsRule Error', error);
      return false;
    }
  }

  defaultMessage(_args: ValidationArguments) {
    return RequestExceptionEnum.DEVICE_NOT_FOUND;
  }
}
