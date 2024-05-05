import { HydratedDocument } from 'mongoose';
import { IBaseSchema } from '../base';
import { DeviceStatus, DeviceTypes } from '../../enum/device';

export interface Device extends IBaseSchema {
  name: string;
  serialNumber: string;
  type: DeviceTypes;
  status: DeviceStatus;
  description: string;
  userId: number;
  deleteFlag: number;
}

export type DeviceDocument = HydratedDocument<Device>;
