import { ConnectOptions, Types as MongooseTypes } from 'mongoose';
import { ModelName, CollectionName } from '../../../utils/enum/collection';

export namespace MongoDatabase {
  export type ConfigOptions = ConnectOptions;
  export type FeatureModuleOptions = {
    provide: ModelName;
    collection?: CollectionName;
    schema: any;
  };
}

export { MongooseTypes };
