import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateCustomerStatusDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
