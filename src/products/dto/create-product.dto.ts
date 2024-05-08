import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ProductConditionEnum } from '../enums/product-condition.enum';
import { ProductIdTypeEnum } from '../enums/product-id-type.enum';
import { ProductWarningEnum } from '../enums/product-warning.enum';
import { CreateAttributeValueDto } from './create-attribute-value.dto';
import { CreateSpecificationDto } from './create-specification.dto';
import { CreateVariationDto } from './create-variation.dto';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  brand: string;

  @ApiProperty()
  @IsEnum(ProductConditionEnum)
  @IsOptional()
  condition: ProductConditionEnum;

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
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quantity: number;

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
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isWithVariations: boolean;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  childCategory: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  legalDisclaimer: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  variationTheme: string;

  @ApiProperty()
  @IsArray()
  // "each" tells class-validator to run the validation on each item of the array
  @IsString({ each: true })
  @ArrayMinSize(0)
  attributeChoices: string[];

  @ApiProperty()
  @IsArray()
  // "each" tells class-validator to run the validation on each item of the array
  @IsString({ each: true })
  @ArrayMinSize(1)
  features: string[];

  @ApiProperty()
  @IsArray()
  // "each" tells class-validator to run the validation on each item of the array
  @IsString({ each: true })
  @ArrayMinSize(1)
  keyWords: string[];

  @ApiProperty()
  @IsArray()
  // "each" tells class-validator to run the validation on each item of the array
  @IsString({ each: true })
  @ArrayMinSize(0)
  @IsOptional()
  searchTerms: string[];

  @ApiProperty()
  @IsArray()
  // "each" tells class-validator to run the validation on each item of the array
  @IsEnum(ProductWarningEnum, { each: true })
  @ArrayMinSize(0)
  warnings: ProductWarningEnum[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  @Type(() => CreateVariationDto)
  @IsOptional()
  variations: CreateVariationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  @Type(() => CreateSpecificationDto)
  @IsOptional()
  specifications: CreateSpecificationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  @Type(() => CreateAttributeValueDto)
  attributeValues: CreateAttributeValueDto[];

  @IsUUID()
  @IsNotEmpty()
  primaryImage: string;

  @IsUUID()
  @IsOptional()
  customBrand: string;

  @IsArray()
  @ArrayMinSize(1)
  //@ArrayMaxSize(10)
  @IsUUID('all', { each: true })
  images: string[];
}
