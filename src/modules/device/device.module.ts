import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { DeviceRepositoryModule } from '../../infrastructure/repository/device/device.module';
import { UserRepositoryModule } from '../../infrastructure/repository/user/user.module';
import { DeviceExistsRule } from '../../utils/dto/device-id-exit-rule.dto';

@Module({
  imports: [
    HttpModule.register({ timeout: 5000 }),
    UserRepositoryModule,
    DeviceRepositoryModule,
  ],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceExistsRule],
})
export class DeviceModule {}
