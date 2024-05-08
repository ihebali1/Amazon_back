import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { VendorStateEnum } from '../enum/vendor-state.enum';

export class UpdateVendorStatusDto {
  @ApiProperty()
  @IsEnum(VendorStateEnum)
  @IsNotEmpty()
  status: VendorStateEnum;
}
