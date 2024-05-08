import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProductTypeEnum } from '../enums/product-type.enum';

export class AddSpecificationToProductDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  arKey: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty()
  @IsEnum(ProductTypeEnum)
  @IsNotEmpty()
  type: ProductTypeEnum;
}
