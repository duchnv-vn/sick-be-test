import { TestingModule, Test } from '@nestjs/testing';
import { connect, createConnection, disconnect } from 'mongoose';
import { MongodbModule } from './database.module';
import { MONGODB_URI } from '../../configs/envs';

describe('MongoDB Module', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongodbModule.forRoot(MONGODB_URI, {
          user: '',
          pass: '',
          dbName: '',
          authSource: undefined,
        }),
      ],
      providers: [],
    }).compile();
  });

  it('Should be createConnection', async () => {
    const con = createConnection(MONGODB_URI);

    await con.close();
  });

  it('Should be connect', async () => {
    const con = await connect(MONGODB_URI);
    await disconnect();
  });
});
