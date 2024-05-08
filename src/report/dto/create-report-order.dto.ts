import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateReportDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  message: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  order: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  image: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  video: string;
}
