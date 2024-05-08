import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaymentPlatformEnum } from '../enums/payment-platform.enum';

export class CreatePaymentPlatformDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  papalName: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  papalNumber: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  stripeName: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  stripeNumber: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bankName: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  bankNumber: number;

  @ApiProperty()
  @IsEnum(PaymentPlatformEnum)
  @IsNotEmpty()
  type: PaymentPlatformEnum;
}
