import { Schema } from 'mongoose';
import { ModelName } from '../../../utils/enum/collection';
import { DeviceTypes } from '../../enum/device';

export const DeviceSchema = new Schema(
  {
    _id: Number,
    name: String,
    description: String,
    deviceType: {
      type: Number,
      enum: DeviceTypes,
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
