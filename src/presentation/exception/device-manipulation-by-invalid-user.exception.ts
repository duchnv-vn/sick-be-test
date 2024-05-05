import { ForbiddenException } from '@nestjs/common';
import { RequestExceptionEnum } from '../../utils/enum/exception';

export class DeviceAccessByValidUserException extends ForbiddenException {
  constructor() {
    super(RequestExceptionEnum.DEVICE_ACCESS_BY_INVALID_USER);
  }
}
