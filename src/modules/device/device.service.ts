import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceRepository } from '../../infrastructure/repository/device/device.repository';

@Injectable()
export class DeviceService {
  constructor(private readonly deviceRepo: DeviceRepository) {}

  async findByUser(userId: number) {
    return this.deviceRepo.findBy({ userId });
  }

  async findOne(_id: number) {
    return this.deviceRepo.findOne({ _id });
  }

  async create(payload: CreateDeviceDto, userId: number) {
    const nextId = await this.deviceRepo.count();
    return this.deviceRepo.create({ ...payload, userId, _id: nextId });
  }

  async update(id: number, payload: UpdateDeviceDto) {
    return this.deviceRepo.updateById(id, payload);
  }

  async remove(id: number) {
    return this.deviceRepo.deleteById(id);
  }
}
