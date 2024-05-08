import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSpecificationDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  arKey: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}
