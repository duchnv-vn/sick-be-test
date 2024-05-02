import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DeviceModule } from './device.module';
import { MONGODB_URI } from '../../configs/envs';
import { MongodbModule } from '../../infrastructure/logger/database/database.module';

describe('DeviceController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongodbModule.forRoot(MONGODB_URI, {}), DeviceModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        stopAtFirstError: true,
        transform: true,
        whitelist: true,
      }),
    );
    await app.init();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});
