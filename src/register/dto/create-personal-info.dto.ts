import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Proofidentity } from 'src/users/enum/personal-proofId.enum';

export class CreatePersonalInfoDto {
  @IsUUID()
  @IsNotEmpty()
  personalCity: string;

  @IsUUID()
  @IsNotEmpty()
  personalCountry: string;

  @IsDate()
  dateBirth: Date;

  @IsUUID()
  @IsNotEmpty()
  personalCountryBirth: string;

  @IsString()
  @IsNotEmpty()
  proofidentity: string;

  @IsDate()
  @IsNotEmpty()
  dateExpiry: Date;
}
