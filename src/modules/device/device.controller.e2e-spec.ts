import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { DeviceModule } from './device.module';
import { LOG_LEVEL, MONGODB_URI } from '../../configs/envs';
import { MongodbModule } from '../../infrastructure/database/database.module';
import { LoggerModule } from '../../infrastructure/logger/logger.module';
import { DATABASE_CONNECTION } from '../../utils/constant';

describe('DeviceController', () => {
  let app: INestApplication;
  let conn: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        LoggerModule.forRoot({
          level: LOG_LEVEL,
        }),
        MongodbModule.forRoot(MONGODB_URI, {}),
        DeviceModule,
      ],
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

    conn = module.get<any>(DATABASE_CONNECTION);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should find list of device', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/devices`)
      .send()
      .expect(200);
  });

  it('should find a device by id', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/devices`)
      .send()
      .expect(200);
  });

  it('should create a device', async () => {
    const { body } = await request(app.getHttpServer())
      .post(`/devices`)
      .send()
      .expect(200);
  });

  it('should update a device', async () => {
    const { body } = await request(app.getHttpServer())
      .put(`/devices`)
      .send()
      .expect(200);
  });

  it('should delete a device', async () => {
    const { body } = await request(app.getHttpServer())
      .delete(`/devices`)
      .send()
      .expect(200);
  });

  afterAll(async () => {
    await conn.disconnect();
  });
});
