import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsNotEmpty,
  IsUUID,
  IsNumber,
  Max,
  Min,
  IsEnum,
} from 'class-validator';
import { ProductTypeEnum } from 'src/products/enums/product-type.enum';

export class CreateReviewDto {
  @ApiProperty({ required: true, maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  content: string;

  @ApiProperty({ required: true, maximum: 5, minimum: 0 })
  @Max(5)
  @Min(0)
  @IsNotEmpty()
  @IsNumber()
  rating: number;

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
