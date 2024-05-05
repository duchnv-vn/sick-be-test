import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { APP_FILTER } from '@nestjs/core';
import { DeviceModule } from './device.module';
import {
  AUTH0_AUDIENCE,
  AUTH0_ISSUER_URL,
  AUTH0_MACHINE_CLIENT_ID,
  AUTH0_MACHINE_CLIENT_SECRECT,
  LOG_LEVEL,
  MONGODB_URI,
} from '../../configs/envs';
import { MongodbModule } from '../../infrastructure/database/database.module';
import { LoggerModule } from '../../infrastructure/logger/logger.module';
import { DATABASE_CONNECTION } from '../../utils/constant';
import { DeviceService } from './device.service';
import { GetUserInfo } from '../../presentation/guard/get-user-info.guard';
import { ValidateTokenJWTModule } from '../../infrastructure/auth/validate-token-jwt/jwt.module';
import { AppExceptionFilter } from '../../presentation/filters/app-exception.filter';
import { DeviceAccessByValidUser } from '../../presentation/guard/device-manipulation-by-valid-user.guard';
import { DeviceExistsRule } from '../../utils/dto/device-id-exit-rule.dto';
import { useContainer } from 'class-validator';
import { HttpModule, HttpService } from '@nestjs/axios';

describe('DeviceController', () => {
  let app: INestApplication;
  let conn: any;
  let deviceService: DeviceService;
  let httpService: HttpService;
  let getUserGuard: GetUserInfo;
  let deviceAccessGuard: DeviceAccessByValidUser;
  let deviceExistRule: DeviceExistsRule;
  let accessToken = '';

  const userAccountCI = {
    _id: 0,
    name: 'testuser',
    email: 'testuser@gmail.com ',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({ timeout: 5000 }),
        ValidateTokenJWTModule,
        LoggerModule.forRoot({
          level: LOG_LEVEL,
        }),
        MongodbModule.forRoot(MONGODB_URI, {}),
        DeviceModule,
      ],
      providers: [
        {
          provide: APP_FILTER,
          useClass: AppExceptionFilter,
        },
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
    app.setGlobalPrefix('api');
    useContainer(app, { fallbackOnErrors: true });
    await app.init();

    conn = module.get<any>(DATABASE_CONNECTION);
    deviceService = module.get<DeviceService>(DeviceService);
    deviceAccessGuard = module.get<DeviceAccessByValidUser>(
      DeviceAccessByValidUser,
    );
    getUserGuard = module.get<GetUserInfo>(GetUserInfo);
    deviceExistRule = module.get<DeviceExistsRule>(DeviceExistsRule);
    httpService = module.get<HttpService>(HttpService);

    const res = await httpService.axiosRef.post(
      `${AUTH0_ISSUER_URL}oauth/token`,
      {
        client_id: AUTH0_MACHINE_CLIENT_ID,
        client_secret: AUTH0_MACHINE_CLIENT_SECRECT,
        audience: AUTH0_AUDIENCE,
        grant_type: 'client_credentials',
      },
      {
        headers: { 'content-type': 'application/json' },
      },
    );

    accessToken = res.data?.access_token;
  });

  beforeEach(() => {
    const getUserCA = jest.spyOn(getUserGuard, 'canActivate');
    getUserCA.mockImplementation((context) => {
      const req = context.switchToHttp().getRequest();
      req.user = userAccountCI;
      return Promise.resolve(true);
    });

    const deviceAccessCA = jest.spyOn(deviceAccessGuard, 'canActivate');
    deviceAccessCA.mockImplementation(() => Promise.resolve(true));

    const deviceExistRuleValidate = jest.spyOn(deviceExistRule, 'validate');
    deviceExistRuleValidate.mockImplementation(() => Promise.resolve(true));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should find list of device', async () => {
    const findByUserFunc = jest.spyOn(deviceService, 'findByUser');
    findByUserFunc.mockImplementationOnce(() => Promise.resolve([]));

    const { body } = await request(app.getHttpServer())
      .get(`/api/devices`)
      .set({
        authorization: `Bearer ${accessToken}`,
      })
      .send()
      .expect(200);

    expect(findByUserFunc).toHaveBeenCalledTimes(1);
    expect(findByUserFunc).toHaveBeenCalledWith(userAccountCI._id);
  });

  it('should find a device by id', async () => {
    const mockDeviceId = 0;

    const findOneFunc = jest.spyOn(deviceService, 'findOne');
    findOneFunc.mockImplementationOnce(() => Promise.resolve({} as any));

    const { body } = await request(app.getHttpServer())
      .get(`/api/devices/${mockDeviceId}`)
      .set({
        authorization: `Bearer ${accessToken}`,
      })
      .send()
      .expect(200);

    expect(findOneFunc).toHaveBeenCalledTimes(1);
    expect(findOneFunc).toHaveBeenCalledWith(mockDeviceId);
  });

  it('should create a device', async () => {
    const mockPayload = {
      name: 'laptop 1',
      description: 'This is description of laptop 1',
      type: 0,
    };

    const createFunc = jest.spyOn(deviceService, 'create');
    createFunc.mockImplementationOnce(() => Promise.resolve({} as any));

    const { body } = await request(app.getHttpServer())
      .post(`/api/devices`)
      .set({
        authorization: `Bearer ${accessToken}`,
      })
      .send(mockPayload)
      .expect(200);

    expect(createFunc).toHaveBeenCalledTimes(1);
    expect(createFunc).toHaveBeenCalledWith(mockPayload, userAccountCI._id);
  });

  it('should update a device', async () => {
    const mockPayload = {
      name: 'laptop 1',
      description: 'This is description of laptop 1',
      type: 0,
    };

    const updateFunc = jest.spyOn(deviceService, 'update');
    updateFunc.mockImplementationOnce(() => Promise.resolve({} as any));

    const mockDeviceId = 0;
    const { body } = await request(app.getHttpServer())
      .put(`/api/devices/${mockDeviceId}`)
      .set({
        authorization: `Bearer ${accessToken}`,
      })
      .send(mockPayload)
      .expect(200);

    expect(updateFunc).toHaveBeenCalledTimes(1);
    expect(updateFunc).toHaveBeenCalledWith(mockDeviceId, mockPayload);
  });

  it('should delete a device', async () => {
    const mockDeviceId = 0;

    const removeFunc = jest.spyOn(deviceService, 'remove');
    removeFunc.mockImplementationOnce(() => Promise.resolve({} as any));

    const { body } = await request(app.getHttpServer())
      .delete(`/api/devices/${mockDeviceId}`)
      .set({
        authorization: `Bearer ${accessToken}`,
      })
      .send()
      .expect(200);

    expect(removeFunc).toHaveBeenCalledTimes(1);
    expect(removeFunc).toHaveBeenCalledWith(mockDeviceId);
  });

  afterAll((done) => {
    conn.disconnect();
    done();
  });
});
