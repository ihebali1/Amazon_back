import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsUUID,
  IsArray,
  ArrayMinSize,
  IsDate,
  IsEmail,
  MaxLength,
} from 'class-validator';

export class CreateTransporterDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  birthDate: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  driveLicenceExpiry: Date;

  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  driveLicence: string;

  @ApiProperty({ required: true })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  greyCards: string[];
}
