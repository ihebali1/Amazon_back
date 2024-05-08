import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { BusinessType } from 'src/users/enum/business-type.enum';

export class CreateBusinessInfoDto {
  @IsEnum(BusinessType)
  @IsNotEmpty()
  businessType: BusinessType;

  @IsUUID()
  @IsNotEmpty()
  businessCountry: string;

  @IsOptional()
  @IsString()
  businessName: string;
}
