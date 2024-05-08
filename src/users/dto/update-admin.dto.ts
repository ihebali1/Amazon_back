import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MaxLength,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  readonly phone: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  readonly firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  readonly lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  readonly managementPack: string;
}
