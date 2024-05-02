import { Schema } from 'mongoose';

export const DeviceSchema = new Schema(
  {
    _id: Number,
    name: String,
  },
  {
    timestamps: true,
  },
);
