import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { CreateBusinessInfoDto } from './create-business-info.dto';

export class UpdateBillingDto extends PartialType(CreateBusinessInfoDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  iban: Date;
}
