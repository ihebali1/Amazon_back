import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { DealsTypeEnum } from '../enums/deals-type.enum';

export class FindDealsDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(DealsTypeEnum)
  type: DealsTypeEnum;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  brand: string;
}
