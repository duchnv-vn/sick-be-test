import { Test, TestingModule } from '@nestjs/testing';
import { disconnect } from 'mongoose';
import { UserRepository } from './user.repository';
import { MongodbModule } from '../../database/database.module';
import { MONGODB_URI } from '../../../configs/envs';
import { UserRepositoryModule } from './user.module';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongodbModule.forRoot(MONGODB_URI, {
          user: '',
          pass: '',
          dbName: '',
          authSource: undefined,
        }),
        UserRepositoryModule,
      ],
      providers: [],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('Should be defined', async () => {
    expect(userRepository).toBeDefined();
  });

  afterAll(async () => {
    await disconnect();
  });
});
