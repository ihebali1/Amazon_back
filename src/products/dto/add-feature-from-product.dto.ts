import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProductTypeEnum } from '../enums/product-type.enum';

export class AddFeatureFromProductDto {
  @ApiProperty()
  @IsEnum(ProductTypeEnum)
  @IsNotEmpty()
  type: ProductTypeEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  feature: string;
}
