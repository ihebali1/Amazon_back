import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { VerificationLanguage } from 'src/users/enum/verification-language.enum';

export class CreateSellerInfoDto {
  @IsString()
  @IsNotEmpty()
  numberCompany: string;

  @IsString()
  @IsNotEmpty()
  adressLine: string;

  @IsOptional()
  @IsString()
  adressLine2: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  favoriteRecieve: string;

  @IsEnum(VerificationLanguage)
  @IsNotEmpty()
  verificationLanguage: VerificationLanguage;
}
