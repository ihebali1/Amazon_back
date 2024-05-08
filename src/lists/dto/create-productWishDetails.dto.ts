import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { WishProductPriorityEnum } from '../enums/wish-product-priority.enum';

export class CreateproductWishDetailsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  needs: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  has: number;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  product: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  wishList: string;

  @ApiProperty()
  @IsEnum(WishProductPriorityEnum)
  @IsNotEmpty()
  priority: WishProductPriorityEnum;
}
