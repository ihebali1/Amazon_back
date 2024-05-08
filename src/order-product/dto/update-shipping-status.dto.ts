import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ShippingStatusEnum } from '../enums/shipping-status.enum';

export class UpdateShippingStatusDto {
  @ApiProperty()
  @IsEnum(ShippingStatusEnum)
  @IsNotEmpty()
  status: ShippingStatusEnum;
}
