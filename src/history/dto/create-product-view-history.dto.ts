import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { ProductTypeEnum } from 'src/products/enums/product-type.enum';

export class CreateProductViewHistoryDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  product: string;

  @ApiProperty({ required: true })
  @IsEnum(ProductTypeEnum)
  @IsNotEmpty()
  type: ProductTypeEnum;
}
