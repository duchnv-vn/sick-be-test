import { HydratedDocument } from 'mongoose';
import { IBaseSchema } from '../base';
import { DeviceTypes } from '../../enum/device';

export interface Device extends IBaseSchema {
  name: string;
  deviceType: DeviceTypes;
  description: string;
  userId: number;
  deleteFlag: number;
}

export type DeviceDocument = HydratedDocument<Device>;
