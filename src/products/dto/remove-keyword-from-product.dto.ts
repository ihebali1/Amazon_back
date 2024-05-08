import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProductIdTypeEnum } from '../enums/product-id-type.enum';
import { ProductTypeEnum } from '../enums/product-type.enum';
import { CreateProductDto } from './create-product.dto';

export class RemoveKeywordFromProductDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsEnum(ProductTypeEnum)
  @IsOptional()
  type: ProductTypeEnum;
}
