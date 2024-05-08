import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UserProfileDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
