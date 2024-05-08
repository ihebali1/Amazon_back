import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateOrderTransporterDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  transporter: string;
}
