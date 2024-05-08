import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RemoveFromCartDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  product: string;
}
