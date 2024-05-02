import { Module } from '@nestjs/common';
import { DeviceModule } from './modules/device/device.module';
import { LOG_LEVEL, MONGODB_URI } from './configs/envs';
import { MongodbModule } from './infrastructure/database/database.module';
import { LoggerModule } from './infrastructure/logger/logger.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      level: LOG_LEVEL,
    }),
    MongodbModule.forRoot(MONGODB_URI, {}),
    ,
    DeviceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
