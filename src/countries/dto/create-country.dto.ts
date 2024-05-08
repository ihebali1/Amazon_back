import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  codeCountry: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nameCountry: string;
}
