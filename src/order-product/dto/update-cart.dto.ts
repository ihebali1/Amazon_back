import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class UpdateCartDto {
  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  quantiy: number;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  product: string;
}
