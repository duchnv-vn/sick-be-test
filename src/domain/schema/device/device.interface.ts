import { HydratedDocument } from 'mongoose';
import { IBaseSchema } from '../base';

export interface Device extends IBaseSchema {
  name: string;
}

export type DeviceDocument = HydratedDocument<Device>;
