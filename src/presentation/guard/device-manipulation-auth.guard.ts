import { BasicAuthGuard } from './basic-auth.guard';
import { DeviceAccessByValidUser } from './device-manipulation-by-valid-user.guard';

export const DeviceAccessAuthGuard = [
  ...BasicAuthGuard,
  DeviceAccessByValidUser,
];
