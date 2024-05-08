import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { ProductTypeEnum } from '../enums/product-type.enum';

export class AddImageToProductImageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ProductTypeEnum)
  type: ProductTypeEnum;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  image: string;
}
