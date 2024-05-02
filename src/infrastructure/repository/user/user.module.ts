import { Module } from '@nestjs/common';
import { MongodbModule } from '../../database/database.module';
import { UserRepository } from './user.repository';
import { UserSchema } from '../../../domain/schema/user/user.schema';
import { ModelName, CollectionName } from '../../../utils/enum/collection';

@Module({
  imports: [
    MongodbModule.forFeature([
      {
        provide: ModelName.USER,
        schema: UserSchema,
        collection: CollectionName[ModelName.USER],
      },
    ]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
