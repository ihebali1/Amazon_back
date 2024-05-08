import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateAddressDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString() 
  @MaxLength(30)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString() 
  @MaxLength(30)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString() 
  @MaxLength(30)
  streetAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  aptNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  postalCode: string;
}
