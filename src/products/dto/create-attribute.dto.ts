import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AttributeTypeEnum } from '../enums/attribute-type.enum';

export class CreateAttributeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  arKey: string;

  @ApiProperty()
  @IsEnum(AttributeTypeEnum)
  @IsNotEmpty()
  type: AttributeTypeEnum;
}
