import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreateMarketPlaceDto } from './create-market-place.dto';

export class UpdateMarketPlaceDto extends PartialType(CreateMarketPlaceDto) {
  @ApiProperty()
  @IsBoolean()
  checked1: boolean;
}
