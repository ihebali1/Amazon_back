import { IsBoolean, IsOptional } from 'class-validator';

export class CreateMarketPlaceDto {
  @IsBoolean()
  @IsOptional()
  checked1: boolean;

  @IsBoolean()
  @IsOptional()
  checked2: boolean;

  @IsBoolean()
  @IsOptional()
  checked3: boolean;
}
