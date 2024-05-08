import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { isNumberObject } from 'util/types';
import { OrderByEnum } from '../enums/order-by.enums';
import { ProductStatusEnum } from '../enums/product-status.enum';

export class FindProductsDto {
  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  categoryId: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  departmentId: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  vendor: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  parentCategoryId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  minPrice: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  maxPrice: number;

  @ApiProperty({ required: false })
  @IsNumberString()
  @Max(5)
  @Min(1)
  @IsOptional()
  rating: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  take: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  skip: number;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  stateId: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  brand: string;

  @ApiProperty({ required: false })
  @IsEnum(OrderByEnum)
  @IsOptional()
  orderBy: OrderByEnum;

  @ApiProperty()
  @IsEnum(ProductStatusEnum)
  @IsOptional()
  status: ProductStatusEnum;
}
