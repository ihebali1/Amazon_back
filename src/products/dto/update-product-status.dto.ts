import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProductStatusEnum } from '../enums/product-status.enum';
import { ProductTypeEnum } from '../enums/product-type.enum';

export class UpdateProductStatusDto {
  @ApiProperty()
  @IsEnum(ProductTypeEnum)
  @IsNotEmpty()
  type: ProductTypeEnum;

  @ApiProperty()
  @IsEnum(ProductStatusEnum)
  @IsNotEmpty()
  status: ProductStatusEnum;

  @ApiProperty()
  @IsString()
  @IsOptional()
  rejectReason: ProductStatusEnum;
}
