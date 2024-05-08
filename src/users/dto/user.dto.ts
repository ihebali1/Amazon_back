import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @MaxLength(30)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;
}
