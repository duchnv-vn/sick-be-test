import { Test, TestingModule } from '@nestjs/testing';
import { disconnect } from 'mongoose';
import { DeviceRepository } from './device.repository';
import { MongodbModule } from '../../database/database.module';
import { MONGODB_URI } from '../../../configs/envs';
import { DeviceRepositoryModule } from './device.module';

describe('DeviceRepository', () => {
  let deviceRepository: DeviceRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongodbModule.forRoot(MONGODB_URI, {
          user: '',
          pass: '',
          dbName: '',
          authSource: undefined,
        }),
        DeviceRepositoryModule,
      ],
      providers: [],
    }).compile();

    deviceRepository = module.get<DeviceRepository>(DeviceRepository);
  });

  it('Should be defined', async () => {
    expect(deviceRepository).toBeDefined();
  });

  afterAll(async () => {
    await disconnect();
  });
});
