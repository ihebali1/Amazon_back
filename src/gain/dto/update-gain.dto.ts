import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { GainEnum } from '../enums/gain.enum';

export class UpdateGainDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  percentage: number;
}
