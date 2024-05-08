import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProductTypeEnum } from '../enums/product-type.enum';
import { ProductWarningEnum } from '../enums/product-warning.enum';

export class AddWarningFromProductDto {
  @ApiProperty()
  @IsEnum(ProductTypeEnum)
  @IsNotEmpty()
  type: ProductTypeEnum;

  @ApiProperty()
  @IsEnum(ProductWarningEnum)
  @IsNotEmpty()
  warning: ProductWarningEnum;
}
