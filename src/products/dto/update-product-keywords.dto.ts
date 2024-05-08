import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductTypeEnum } from '../enums/product-type.enum';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductKeywordsDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsArray()
  // "each" tells class-validator to run the validation on each item of the array
  @IsString({ each: true })
  @ArrayMinSize(0)
  @IsOptional()
  searchTerms: string[];

  @ApiProperty()
  @IsEnum(ProductTypeEnum)
  @IsOptional()
  type: ProductTypeEnum;
}
