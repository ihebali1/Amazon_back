import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @MinLength(8)
  password: string;
}
