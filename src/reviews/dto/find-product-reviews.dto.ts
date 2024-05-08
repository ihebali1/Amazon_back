import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsEnum } from 'class-validator';
import { ProductTypeEnum } from 'src/products/enums/product-type.enum';

export class FindProductReviewsDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUUID()
  @IsNotEmpty()
  product: string;

  @ApiProperty({ required: true, enum: ProductTypeEnum })
  @IsEnum(ProductTypeEnum)
  @IsNotEmpty()
  productType: ProductTypeEnum;
}
