import { Global } from '@nestjs/common/decorators/modules/global.decorator';
import { DynamicModule } from '@nestjs/common/interfaces/modules/dynamic-module.interface';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';

import { LoggerOptions } from 'winston';
import { LoggerService } from './logger.service';
import { LogOptions } from './common';

@Global()
@Module({})
export class LoggerModule {
  static forRoot({
    level,
    driver,
    ...config
  }: LogOptions & Partial<LoggerOptions> = {}): DynamicModule {
    const providers: Provider[] = [
      {
        provide: LoggerService,
        useValue: new LoggerService({
          ...config,
          level,
          driver,
        }),
      },
    ];

    return {
      module: LoggerModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}
