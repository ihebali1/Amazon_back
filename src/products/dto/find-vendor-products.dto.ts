import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsBooleanString,
  IsEnum,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { ProductStatusEnum } from '../enums/product-status.enum';

export class FindVendorProductsDto {
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isApproved: boolean;

  @ApiProperty({ required: false })
  @IsEnum(ProductStatusEnum)
  @IsOptional()
  status: ProductStatusEnum;

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  page: number;

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  number: number;
}
