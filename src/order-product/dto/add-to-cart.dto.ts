import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class AddToCartDto {
  @ApiProperty()
  @IsPositive()
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  product: string;
}
