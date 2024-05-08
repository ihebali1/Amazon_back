import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProductTypeEnum } from '../enums/product-type.enum';

export class AddKeywordFromProductDto {
  @ApiProperty()
  @IsEnum(ProductTypeEnum)
  @IsNotEmpty()
  type: ProductTypeEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  keyword: string;
}
