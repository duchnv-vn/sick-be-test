import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../base/base.repository';
import { ModelName } from '../../../utils/enum/collection';
import { Device } from '../../../domain/schema/device/device.interface';

@Injectable()
export class DeviceRepository extends BaseRepository<Device> {
  constructor(
    @Inject(ModelName.DEVICE)
    protected readonly model: Model<Device>,
  ) {
    super(model);
  }
}
