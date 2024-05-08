import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Gender } from '../enum/gender.enum';

export class UpdateInfoDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  dateBirth: string;

  @ApiProperty()
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;
}
