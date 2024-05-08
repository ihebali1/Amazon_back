import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductConditionEnum } from '../enums/product-condition.enum';
import { ProductIdTypeEnum } from '../enums/product-id-type.enum';
import { ProductWarningEnum } from '../enums/product-warning.enum';

import { CreateProductDto } from './create-product.dto';

export class UpdateVariationDto {
  @ApiProperty()
  @IsEnum(ProductIdTypeEnum)
  @IsNotEmpty()
  productIdType: ProductIdTypeEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  variationQuantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  variationPrice: number;

  @ApiProperty()
  @IsEnum(ProductConditionEnum)
  @IsNotEmpty()
  variationCondition: ProductConditionEnum;
}
