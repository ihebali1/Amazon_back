import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ProductIdTypeEnum } from '../enums/product-id-type.enum';
import { ProductTypeEnum } from '../enums/product-type.enum';
import { CreateProductDto } from './create-product.dto';

export class RemoveImageFromProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ProductTypeEnum)
  type: ProductTypeEnum;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  image: string;
}
