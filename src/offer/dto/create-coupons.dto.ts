import { ApiProperty } from '@nestjs/swagger';
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
} from 'class-validator';
import { CouponsTypeEnum } from '../enums/coupons-type.enum';

export class CreateCouponsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  budget: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  discount: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  redemptionLimit: boolean;

  @ApiProperty()
  @IsArray()
  @IsUUID('all', { each: true })
  @ArrayMinSize(1)
  products: [];

  @ApiProperty()
  @IsEnum(CouponsTypeEnum)
  type: CouponsTypeEnum;
}
