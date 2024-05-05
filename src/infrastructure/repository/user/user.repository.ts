import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../base/base.repository';
import { User } from '../../../domain/schema/user/user.interface';
import { ModelName } from '../../../utils/enum/collection';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @Inject(ModelName.USER)
    protected readonly model: Model<User>,
  ) {
    super(model);
  }
}
