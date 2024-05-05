import { Schema } from 'mongoose';
import { ModelName } from '../../../utils/enum/collection';
import { DeviceStatus, DeviceTypes } from '../../enum/device';

export const DeviceSchema = new Schema(
  {
    _id: Number,
    name: String,
    description: String,
    type: {
      type: Number,
      enum: DeviceTypes,
    },
    status: {
      type: Number,
      enum: DeviceStatus,
      default: DeviceStatus.ONLINE,
    },
    userId: {
      type: Number,
      ref: ModelName.USER,
    },
    deleteFlag: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

DeviceSchema.index(
  {
    userId: 1,
  },
  {
    name: 'userId_2024-05-03',
  },
);
