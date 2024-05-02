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
} from '@nestjs/common';
import { Response } from 'express';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { ResponseInterceptor } from '../../presentation/interceptors/response.interceptor';

@Controller('devices')
@UseInterceptors(ResponseInterceptor)
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  findAll(@Res() _res: Response) {
    try {
      return this.deviceService.findAll();
    } catch (error) {
      this.logger.log('deviceController.findAll', error);
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() _res: Response) {
    try {
      return this.deviceService.findOne(+id);
    } catch (error) {
      this.logger.log('deviceController.findOne', error);
      throw error;
    }
  }

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto, @Res() _res: Response) {
    try {
      return this.deviceService.create(createDeviceDto);
    } catch (error) {
      this.logger.log('deviceController.create', error);
      throw error;
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
    @Res() _res: Response,
  ) {
    try {
      return this.deviceService.update(+id, updateDeviceDto);
    } catch (error) {
      this.logger.log('deviceController.update', error);
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() _res: Response) {
    try {
      return this.deviceService.remove(+id);
    } catch (error) {
      this.logger.log('deviceController.remove', error);
      throw error;
    }
  }
}
