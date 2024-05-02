import { HttpStatus } from '@nestjs/common';

export class BaseResponseDto {
  statusCode: HttpStatus;
  message: string;
}
