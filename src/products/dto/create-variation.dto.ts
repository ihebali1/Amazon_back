import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductConditionEnum } from '../enums/product-condition.enum';
import { ProductIdTypeEnum } from '../enums/product-id-type.enum';
import { CreateAttributeValueDto } from './create-attribute-value.dto';

export class CreateVariationDto {
  @ApiProperty()
  @IsEnum(ProductIdTypeEnum)
  @IsOptional()
  productIdType: ProductIdTypeEnum;

  @ApiProperty()
  @IsString()
  @IsOptional()
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

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => CreateAttributeValueDto)
  attributeValues: CreateAttributeValueDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  // "each" tells class-validator to run the validation on each item of the array
  @IsString({ each: true })
  attributeChoices: string[];
}
