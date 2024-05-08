import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateSavedItemsDto } from './create-savedItems.dto';

export class UpdateSavedItemsDto extends PartialType(CreateSavedItemsDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
