import { Request, Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { get } from 'lodash';
import { HttpExceptionEnum } from '../../utils/enum/exception';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    console.log('------------------------');
    console.log('exception', exception);
    console.log('------------------------');
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (true) {
      case exception instanceof HttpException:
        status = exception.getStatus();
        break;

      default:
        exception.message = HttpExceptionEnum.INTERNAL_SERVER_ERROR;
        break;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: `${
        get(exception, 'response.message', []) || exception.message || []
      }`.toString(),
    });
  }
}
