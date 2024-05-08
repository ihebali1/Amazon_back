import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ProductTypeEnum } from '../enums/product-type.enum';

export class UpdateProductOfferDto {
  @ApiProperty()
  @IsEnum(ProductTypeEnum)
  @IsOptional()
  type: ProductTypeEnum;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
