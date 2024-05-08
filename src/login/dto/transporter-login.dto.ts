import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class TransporterLoginDto {
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  readonly password: string;
}
