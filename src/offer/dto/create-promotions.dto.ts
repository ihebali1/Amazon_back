import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  isUUID,
  ValidateNested,
} from 'class-validator';
import { isStringObject } from 'util/types';
import { PromotionsTypeEnum } from '../enums/promotions-type.enum';
import { IsArrayOfObjects } from './create-deals.dto.';
import { CreateTierPromotionsDto } from './create-tier-promotions.dto';

export class CreatepromotionsDto {
  @ApiProperty()
  @ValidateNested({ each: true })
  @IsArrayOfObjects()
  @Type(() => CreateTierPromotionsDto)
  productTiers: CreateTierPromotionsDto[];

  @ApiProperty()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  discount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  minQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  redemptionLimit: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PromotionsTypeEnum)
  type: PromotionsTypeEnum;

  @ApiProperty()
  @IsArray()
  @IsUUID('all', { each: true })
  @ArrayMinSize(1)
  products: [];

  @ApiProperty()
  @IsArray()
  @IsUUID('all', { each: true })
  @ArrayMinSize(1)
  appliesTo: [];
}
