import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  readonly oldPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  readonly newPassword: string;
}
