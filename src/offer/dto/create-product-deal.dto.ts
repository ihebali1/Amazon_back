import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateProductDealDto {
  @ApiProperty()
  @IsNumber()
  @Min(0.1)
  @IsNotEmpty()
  dealPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  product: string;
}
