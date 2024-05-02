import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { ResponseInterceptor } from '../../presentation/interceptors/response.interceptor';
import { Me } from '../../utils/decorator/me';
import { User } from '../../domain/schema/user/user.interface';
import { BasicAuthGuard } from '../../presentation/guard/basic-auth.guard';
import { DeviceAccessAuthGuard } from '../../presentation/guard/device-manipulation-auth.guard';
import { DeviceIdParamsDto } from './dto/device-id-param.dto';

@Controller('devices')
@UseInterceptors(ResponseInterceptor)
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @UseGuards(...BasicAuthGuard)
  async findByUser(@Me() { _id }: User, @Res() _res: Response) {
    try {
      const devices = await this.deviceService.findByUser(_id);
      return devices;
    } catch (error) {
      this.logger.log('deviceController.findByUser', error);
      throw error;
    }
  }

  @Get(':deviceId')
  @UseGuards(...DeviceAccessAuthGuard)
  async findOne(
    @Param() { deviceId }: DeviceIdParamsDto,
    @Res() _res: Response,
  ) {
    try {
      const device = await this.deviceService.findOne(deviceId);
      return device;
    } catch (error) {
      this.logger.log('deviceController.findOne', error);
      throw error;
    }
  }

  @Post()
  @UseGuards(...BasicAuthGuard)
  async create(
    @Me() { _id }: User,
    @Body() body: CreateDeviceDto,
    @Res() _res: Response,
  ) {
    try {
      const device = await this.deviceService.create(body, _id);
      return device;
    } catch (error) {
      this.logger.log('deviceController.create', error);
      throw error;
    }
  }

  @Put(':deviceId')
  @UseGuards(...DeviceAccessAuthGuard)
  async update(
    @Param() { deviceId }: DeviceIdParamsDto,
    @Body() body: UpdateDeviceDto,
    @Res() _res: Response,
  ) {
    try {
      const device = await this.deviceService.update(deviceId, body);
      return device;
    } catch (error) {
      this.logger.log('deviceController.update', error);
      throw error;
    }
  }

  @Delete(':deviceId')
  @UseGuards(...DeviceAccessAuthGuard)
  async remove(
    @Param() { deviceId }: DeviceIdParamsDto,
    @Res() _res: Response,
  ) {
    try {
      return this.deviceService.remove(deviceId);
    } catch (error) {
      this.logger.log('deviceController.remove', error);
      throw error;
    }
  }
}
