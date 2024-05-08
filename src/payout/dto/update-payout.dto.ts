import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UpdatePayoutStatusEnum } from '../enums/update-status.enum';

export class UpdatePayoutDto {
  @ApiProperty({ required: true, enum: UpdatePayoutStatusEnum })
  @IsEnum(UpdatePayoutStatusEnum)
  @IsNotEmpty()
  status: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  rejectMessage: string;
}
