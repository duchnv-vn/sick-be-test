import { Injectable } from '@nestjs/common';
import { LoggerService as LoggerServiceCommon } from '@nestjs/common/services/logger.service';
import {
  Logger as LoggerCommon,
  LoggerOptions,
  createLogger,
  transports,
} from 'winston';
import { LogOptions } from './common';

@Injectable()
export class LoggerService implements LoggerServiceCommon {
  private logger!: LoggerCommon;

  constructor(options: LogOptions & Partial<LoggerOptions> = {}) {
    const opts = {
      level: options.level,
      transports: [new transports.Console()],
    };

    options.driver && opts.transports.push(options.driver);

    this.logger = createLogger(opts);
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message, ...optionalParams);
  }

  fatal?(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }
}
