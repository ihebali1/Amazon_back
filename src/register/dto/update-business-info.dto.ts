import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBusinessInfoDto } from './create-business-info.dto';

export class UpdateBusinessInfoDto extends PartialType(CreateBusinessInfoDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  countries: string[];
}
