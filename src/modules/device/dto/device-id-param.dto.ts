import { Transform } from 'class-transformer';
import { Validate, IsInt, IsNotEmpty } from 'class-validator';
import { DeviceExistsRule } from '../../../utils/dto/device-id-exit-rule.dto';

export class DeviceIdParamsDto {
  @Validate(DeviceExistsRule)
  @IsInt()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  deviceId: number;
}
