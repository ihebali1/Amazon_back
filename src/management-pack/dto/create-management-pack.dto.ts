import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateManagementPackDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  readonly name: string;

  @ApiProperty({ required: true, isArray: true })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @ArrayMinSize(1)
  permissions: string[];

  @ApiProperty({ required: true, isArray: true })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @ArrayMinSize(1)
  admins: string[];
}
