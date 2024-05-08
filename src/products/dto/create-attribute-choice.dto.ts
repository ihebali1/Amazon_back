import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ChoiceTypeEnum } from '../enums/choice-type.enum';

export class CreateAttributeChoiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty()
  @IsEnum(ChoiceTypeEnum)
  @IsNotEmpty()
  type: ChoiceTypeEnum;
}
