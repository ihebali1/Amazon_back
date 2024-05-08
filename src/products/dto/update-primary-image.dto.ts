import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ProductTypeEnum } from '../enums/product-type.enum';
export class UpdatePrimaryImageDto {
  @IsUUID()
  @IsNotEmpty()
  primaryImage: string;

  @ApiProperty()
  @IsEnum(ProductTypeEnum)
  @IsOptional()
  type: ProductTypeEnum;
}
