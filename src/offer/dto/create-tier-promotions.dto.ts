import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { IsArrayOfObjects } from './create-deals.dto.';
import { CreatepromotionsDto } from './create-promotions.dto';

export class CreateTierPromotionsDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  discount: number;
}
