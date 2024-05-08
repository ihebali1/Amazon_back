import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePersonalCheckingAccountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  bankRoutingNumber: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  accountNumber: number;

  @ApiProperty()
  @IsBoolean()
  state: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  client: string;
}
