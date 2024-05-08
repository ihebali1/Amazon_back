import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStateDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  codeState: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nameState: string;
}
