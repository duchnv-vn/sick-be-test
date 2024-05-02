import { HydratedDocument } from 'mongoose';
import { IBaseSchemaCommon } from '../base';

export interface User extends IBaseSchemaCommon {
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
}

export type UserDocument = HydratedDocument<User>;
