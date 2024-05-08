import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateReportMessageDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsUUID()
  image: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsUUID()
  video: string;
}
