import { Module } from '@nestjs/common';
import { MongodbModule } from '../../database/database.module';
import { DeviceRepository } from './device.repository';
import { ModelName, CollectionName } from '../../../utils/enum/collection';
import { DeviceSchema } from '../../../domain/schema/device/device.schema';

@Module({
  imports: [
    MongodbModule.forFeature([
      {
        provide: ModelName.DEVICE,
        schema: DeviceSchema,
        collection: CollectionName[ModelName.DEVICE],
      },
    ]),
  ],
  providers: [DeviceRepository],
  exports: [DeviceRepository],
})
export class DeviceRepositoryModule {}
