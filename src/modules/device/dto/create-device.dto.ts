import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { DeviceStatus, DeviceTypes } from '../../../domain/enum/device';
import { Transform } from 'class-transformer';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsEnum(DeviceTypes)
  @IsNotEmpty()
  type: DeviceTypes;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsEnum(DeviceStatus)
  @IsOptional()
  status: DeviceStatus;

  @IsString()
  @IsOptional()
  description: string;
}
