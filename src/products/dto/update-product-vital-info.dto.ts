import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProductConditionEnum } from '../enums/product-condition.enum';
import { ProductIdTypeEnum } from '../enums/product-id-type.enum';
import { ProductTypeEnum } from '../enums/product-type.enum';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductVitalInfoDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  productId: string;

  @ApiProperty()
  @IsEnum(ProductIdTypeEnum)
  @IsOptional()
  productIdType: ProductIdTypeEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  manufactureSerial: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  arName: string;

  @ApiProperty()
  @IsEnum(ProductConditionEnum)
  @IsOptional()
  condition: ProductConditionEnum;

  @ApiProperty()
  @IsEnum(ProductTypeEnum)
  @IsOptional()
  type: ProductTypeEnum;
}
