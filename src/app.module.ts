import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DeviceModule } from './modules/device/device.module';
import { LOG_LEVEL, MONGODB_URI } from './configs/envs';
import { MongodbModule } from './infrastructure/database/database.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { AppExceptionFilter } from './presentation/filters/app-exception.filter';

@Module({
  imports: [
    LoggerModule.forRoot({
      level: LOG_LEVEL,
    }),
    MongodbModule.forRoot(MONGODB_URI, {}),
    ,
    DeviceModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
