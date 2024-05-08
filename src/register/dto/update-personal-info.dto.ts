import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePersonalInfoDto } from './create-personal-info.dto';

export class UpdatePersonalInfoDto extends PartialType(CreatePersonalInfoDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  countries: string[];
}
