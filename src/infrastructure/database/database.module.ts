import { DynamicModule } from '@nestjs/common/interfaces/modules/dynamic-module.interface';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { connect, model } from 'mongoose';
import { MongoDatabase } from './database.type';
import { DATABASE_CONNECTION } from '../../utils/constant';
import { CollectionName } from '../../utils/enum/collection';

@Module({})
export class MongodbModule {
  static forRoot(
    uri: string,
    options: MongoDatabase.ConfigOptions,
  ): DynamicModule {
    const providers = [
      {
        provide: DATABASE_CONNECTION,
        useFactory: async () => await connect(uri, options),
      },
    ];
    return {
      module: MongodbModule,
      providers,
      exports: providers,
      global: true,
    };
  }

  static forFeature(
    providersInput: MongoDatabase.FeatureModuleOptions[],
  ): DynamicModule {
    const providers = providersInput.map(
      (provider: MongoDatabase.FeatureModuleOptions): Provider => {
        return {
          provide: provider.provide,
          useFactory: () =>
            model(
              provider.provide,
              provider.schema,
              CollectionName[provider.provide],
            ),
          inject: [DATABASE_CONNECTION],
        };
      },
    );

    return {
      module: this,
      providers,
      exports: providers,
    };
  }
}
