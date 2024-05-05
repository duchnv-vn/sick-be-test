import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DeviceModule } from './modules/device/device.module';
import { LOG_LEVEL, MONGODB_URI } from './configs/envs';
import { MongodbModule } from './infrastructure/database/database.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { AppExceptionFilter } from './presentation/filters/app-exception.filter';
import { AppController } from './app.controller';
import { ValidateTokenJWTModule } from './infrastructure/auth/validate-token-jwt/jwt.module';

@Module({
  imports: [
    ValidateTokenJWTModule,
    LoggerModule.forRoot({
      level: LOG_LEVEL,
    }),
    MongodbModule.forRoot(MONGODB_URI, {}),
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
