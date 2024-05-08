import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { BusinessType } from '../enum/business-type.enum';
import { UserDto } from './user.dto';

export class UpdateBusinessInfoDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  businessName: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  numberCompany: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  storeName: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  storeDescription: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  adressLine: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  adressLine2: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  postalCode: string;
  @ApiProperty({
    required: true,
  })
  @ApiProperty({ required: true })
  @IsEnum(BusinessType)
  @IsNotEmpty()
  businessType: BusinessType;
}
