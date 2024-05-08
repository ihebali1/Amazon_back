import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class OtpDto {
  readonly id: number;

  @IsString()
  @MaxLength(30)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(6)
  otp: string;
}
