import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsArray,
  IsUUID,
  ArrayMinSize,
} from 'class-validator';

export class UpdateManagementPackDto {
  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  readonly name: string;

  @ApiProperty({ required: true, isArray: true })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @ArrayMinSize(0)
  permissions: string[];

  @ApiProperty({ required: true, isArray: true })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @ArrayMinSize(0)
  admins: string[];
}
