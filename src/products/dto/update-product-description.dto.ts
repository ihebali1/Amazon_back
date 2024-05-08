import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductTypeEnum } from '../enums/product-type.enum';
import { ProductWarningEnum } from '../enums/product-warning.enum';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDescriptionDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  legalDisclaimer: string;

  @ApiProperty()
  @IsArray()
  // "each" tells class-validator to run the validation on each item of the array
  @IsString({ each: true })
  @ArrayMinSize(1)
  features: string[];

  @ApiProperty()
  @IsArray()
  // "each" tells class-validator to run the validation on each item of the array
  @IsEnum(ProductWarningEnum, { each: true })
  @ArrayMinSize(0)
  warnings: ProductWarningEnum[];

  @ApiProperty()
  @IsEnum(ProductTypeEnum)
  @IsOptional()
  type: ProductTypeEnum;
}
