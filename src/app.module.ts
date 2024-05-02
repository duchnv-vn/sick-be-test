import { Module } from '@nestjs/common';
import { DeviceModule } from './modules/device/device.module';

@Module({
  imports: [DeviceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
