import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { LoggerModule } from '../../infrastructure/logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
