import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCreditCardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  client: string;
}
