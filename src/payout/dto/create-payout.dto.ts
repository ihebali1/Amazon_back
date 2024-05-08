import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreatePayoutDto {
  @ApiProperty({ required: true })
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
