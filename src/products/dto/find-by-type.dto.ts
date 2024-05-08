import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ProductTypeEnum } from '../enums/product-type.enum';

export class FindByTypeDto {
  @ApiProperty({ required: true })
  @IsEnum(ProductTypeEnum)
  @IsNotEmpty()
  type: ProductTypeEnum;
}
