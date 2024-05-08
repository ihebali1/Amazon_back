import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ProductTypeEnum } from '../enums/product-type.enum';

export class RemoveWarningFromProductDto {
  @ApiProperty()
  @IsEnum(ProductTypeEnum)
  @IsOptional()
  type: ProductTypeEnum;
}
