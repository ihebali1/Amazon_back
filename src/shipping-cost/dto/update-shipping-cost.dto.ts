import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateShippingCostDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
