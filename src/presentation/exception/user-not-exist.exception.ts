import { UnauthorizedException } from '@nestjs/common';
import { RequestExceptionEnum } from '../../utils/enum/exception';

export class UserNotExistException extends UnauthorizedException {
  constructor() {
    super(RequestExceptionEnum.USER_NOT_EXIST);
  }
}
