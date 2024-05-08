import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductRegistryDetailsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isMostWanted: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  registry: string;
}
