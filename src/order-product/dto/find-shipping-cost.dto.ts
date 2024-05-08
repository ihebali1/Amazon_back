import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindShippingCostDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  state: string;
}
