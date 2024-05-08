import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ShippingStatusEnum } from 'src/order-product/enums/shipping-status.enum';

export class FindTransporterOrdersDto {
  @ApiProperty({ required: false })
  @IsEnum(ShippingStatusEnum)
  @IsOptional()
  status: ShippingStatusEnum;
}
